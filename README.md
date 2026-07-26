"# Supermarket Chatbot with NLP

An intelligent chatbot system that helps customers locate products in a supermarket using Natural Language Processing (NLP). The system combines a FastAPI backend with a React-based frontend to provide an intuitive interface for product discovery.

## 🚀 Features

- **Smart NLP Engine**: Uses NLTK for tokenization, POS tagging, and lemmatization to understand user queries
- **Product Location Mapping**: Quickly identifies product locations within the store
- **CORS-Enabled API**: Full cross-origin support for seamless frontend integration
- **React Frontend**: Modern, responsive user interface with Tailwind CSS styling
- **Product Database**: JSON-based inventory management system

## 📁 Project Structure

```
├── Backend/                 # FastAPI backend server
│   ├── main.py            # FastAPI application and endpoints
│   ├── nlp_engine.py      # NLP processing and text analysis
│   ├── database.json      # Product inventory database
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
└── README.md             # Project documentation
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **NLTK**: Natural Language Toolkit for NLP processing
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for FastAPI

### Frontend
- **React 19.2**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## 📦 Installation

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, access the interactive Swagger API documentation at:
`http://localhost:8000/docs`

## 🤖 NLP Engine

The NLP engine processes user queries through the following pipeline:
1. **Tokenization**: Splits input text into individual tokens
2. **POS Tagging**: Identifies parts of speech for each token
3. **Lemmatization**: Reduces words to their base form
4. **Inventory Matching**: Matches identified products with store locations
5. **Response Generation**: Returns product locations and unrecognized terms

## 💾 Database

The product inventory is stored in `Backend/database.json` with the following structure:
```json
{
  "product_name": "shelf_location"
}
```

## 📝 License

This project is open source and available under the MIT License." 
