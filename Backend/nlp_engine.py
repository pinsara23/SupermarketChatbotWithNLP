import json
import nltk
import os
import difflib
from nltk.stem import WordNetLemmatizer

# Download NLTK datasets silently (added wordnet for lemmatization)
nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('omw-1.4', quiet=True)

# Initialize the lemmatizer
lemmatizer = WordNetLemmatizer()

def load_inventory(filepath="database.json"):
    """Loads the product-location mapping from the JSON file."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(base_dir, filepath)
    
    with open(full_path, "r") as file:
        return json.load(file)

def process_text(user_input: str, inventory: dict) -> dict:
    """
    NLP Pipeline:
    1. Tokenize and POS tag.
    2. Lemmatize every word.
    3. Check the inventory FIRST to bypass NLTK misclassifications.
    4. If not in DB, use POS tags to catch unknown Nouns.
    """
    tokens = nltk.word_tokenize(user_input)
    pos_tags = nltk.pos_tag(tokens)
    
    locations = []
    unrecognized = []
    found_items = set()
    
    ignore_words = {"shelf", "list", "item", "where", "store", "hello", "hi", "please", "can", "find", "i", "you", "me", "the", "a", "an", "and", "some", "of", "in", "on", "at", "for", "buy", "get", "want", "need", "looking", "looking for", "looking to buy", "looking to get", "looking to find"}
    
    normalized_inventory = {}
    for key, shelf in inventory.items():
        lemma_key = lemmatizer.lemmatize(key.lower())
        normalized_inventory[lemma_key] = {"original": key, "shelf": shelf}
    
    for word, tag in pos_tags:
        word_lower = word.lower()
        
        if not word_lower.isalpha():
            continue

        if not tag.startswith('NN'):
            continue
            
        # Lemmatize every word immediately so we can match plurals to the DB
        lemma_word = lemmatizer.lemmatize(word_lower)
        
        #1. Check inventory FIRST. If it's a known product, we don't care what NLTK tagged it as.
        if lemma_word in normalized_inventory:
            if lemma_word not in found_items:
                db_item = normalized_inventory[lemma_word]
                locations.append({"item": db_item["original"], "shelf": db_item["shelf"]})
                found_items.add(lemma_word)

        #2.check typos
        else: 
            close_matches = difflib.get_close_matches(lemma_word, normalized_inventory.keys(), n=1, cutoff=0.75)

            if close_matches:
                # Use the closest match from the inventory
                best_match = close_matches[0]
                if best_match not in found_items:
                    db_item = normalized_inventory[best_match]
                    locations.append({"item": db_item["original"], "shelf": db_item["shelf"]})
                    found_items.add(best_match)

            #3. If it's not in the DB, THEN check if NLTK tagged it as a Noun (NN or NNS)        
            elif lemma_word not in ignore_words and lemma_word not in unrecognized:
                    unrecognized.append(lemma_word)
                           
    return {
        "locations": locations,
        "unrecognized": unrecognized
    }

if __name__ == "__main__":
    db = load_inventory()
    # Testing code
    test_sentence = "Hello, where can I find aple, bread, cheese, eggs and some batteries?"
    print(f"Input: {test_sentence}")
    print("Output:", process_text(test_sentence, db))