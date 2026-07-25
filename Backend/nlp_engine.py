import json
import nltk
import os

# Download NLTK datasets silently
nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

def load_inventory(filepath="database.json"):
    """Loads the product-location mapping from the JSON file."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(base_dir, filepath)
    
    with open(full_path, "r") as file:
        return json.load(file)

def process_text(user_input: str, inventory: dict) -> dict:

    """
    Takes user text, tokenizes it, and extracts items.
    Bypasses POS tagging for known DB items to avoid NLTK misclassification.
    Uses POS tagging to find unknown nouns.
    """
    tokens = nltk.word_tokenize(user_input)
    pos_tags = nltk.pos_tag(tokens)
    
    locations = []
    unrecognized = []
    found_items = set()
    
    ignore_words = {"shelf", "list", "items", "where", "store", "hello", "hi", "please", "can", "find"}
    
    for word, tag in pos_tags:
        # Strip out punctuation and lowercase it
        word_lower = word.lower()
        
        # We only care about actual words, not commas or question marks
        if not word_lower.isalpha():
            continue

        # If the word is in our database, it's a product! Ignore NLTK's grammar tag.
        if word_lower in inventory:
            if word_lower not in found_items:
                locations.append({"item": word_lower, "shelf": inventory[word_lower]})
                found_items.add(word_lower)
                
        # POS Tagging for Unknowns
        # If it's not in the DB, but NLTK says it's a Noun (NN or NNS)
        elif tag.startswith('NN'):
            if word_lower not in ignore_words and word_lower not in unrecognized:
                unrecognized.append(word_lower)
                    
    return {
        "locations": locations,
        "unrecognized": unrecognized
    }

if __name__ == "__main__":
    db = load_inventory()
    test_sentence = "Hello, where can I find eggs, bread, and some batteries?"
    print(f"Input: {test_sentence}")
    print("Output:", process_text(test_sentence, db))