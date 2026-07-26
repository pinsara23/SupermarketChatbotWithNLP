"# Supermarket Chatbot Backend

FastAPI-based backend server for the Supermarket Chatbot application. This service handles natural language processing, product inventory queries, and provides REST API endpoints.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager

### Installation

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Ensure `database.json` is in the Backend directory with your product inventory

3. Run the server:
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000`

## 📡 API Endpoints

### POST `/chat`
Processes a user query and returns product locations.

**Request:**
```json
{
  "user_input": "Where can I find milk?"
}
```

**Response:**
```json
{
  "locations": [
    {
      "item": "milk",
      "shelf": "shelf 12"
    }
  ],
  "unrecognized": []
}
```

## 🔧 Core Components

### main.py
- FastAPI application setup
- CORS middleware configuration
- Chat endpoint implementation
- Request/Response schema definitions

### nlp_engine.py
- Product inventory loading
- Text tokenization and POS tagging
- Word lemmatization
- Inventory matching algorithm
- Unrecognized term detection

### database.json
- Product-to-location mapping
- Centralized inventory database

## 📚 Dependencies

Key packages included in `requirements.txt`:
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pydantic**: Data validation
- **nltk**: Natural language processing
- **python-multipart**: Form parsing

## 🔍 NLP Processing Pipeline

The NLP engine follows this workflow:
1. Tokenizes user input
2. Applies POS tagging
3. Lemmatizes tokens to base forms
4. Queries database for matching products
5. Returns locations and unrecognized items

## 🛡️ CORS Configuration

The API is configured to accept requests from all origins:
- Allow-Origin: `*`
- Allow-Methods: All methods
- Allow-Headers: All headers
- Allow-Credentials: Yes

## 📖 Interactive API Documentation

Visit `http://localhost:8000/docs` for Swagger UI
Visit `http://localhost:8000/redoc` for ReDoc documentation

## 🐛 Troubleshooting

- **Module not found errors**: Run `pip install -r requirements.txt`
- **Port already in use**: Change the port in main.py or kill existing processes
- **Database not found**: Ensure `database.json` exists in the Backend directory
- **NLTK data missing**: The script auto-downloads required NLTK datasets on first run" 
