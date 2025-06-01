# LLM-Driven-Restaurant-Finder-App

# Restaurant Finder App

An intelligent restaurant search application that converts natural language queries into structured restaurant searches using AI and the Foursquare Places API.

## 🌟 Features

- **Natural Language Processing**: Enter queries like "Find me cheap sushi in downtown LA that's open now"
- **AI-Powered Query Conversion**: Uses Google's Gemini AI to convert natural language to structured API calls
- **Real-time Restaurant Data**: Fetches live restaurant information from Foursquare Places API
- **Comprehensive Results**: Displays restaurant name, address, cuisine, rating, price level, and operating hours
- **Modern Tech Stack**: React frontend with TypeScript Node.js backend

## 🏗️ Architecture

### Frontend (React + TypeScript)

- `src/components/`: Reusable UI components
- `src/utils/`: Utility functions and helpers
- `src/types.ts`: TypeScript type definitions

### Backend (Node.js + TypeScript)

- `src/controllers/`: API route handlers
- `src/services/`: Business logic and external API integrations
- `src/middleware/`: Express middleware functions
- `src/routes/`: API route definitions
- `src/prompts/`: AI prompt templates

## 📁 Project Structure

```
restaurant-finder/
├── client/                          # React frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── searchRestaurants.ts # API client functions
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Card.tsx            # Restaurant result card component
│   │   │   ├── ResultsSection.tsx  # Search results display
│   │   │   └── SearchForm.tsx      # User input form
│   │   ├── hooks/
│   │   │   └── useSearch.ts        # Custom search hook
│   │   ├── utils/
│   │   │   ├── formatRating.ts     # Rating formatting utilities
│   │   │   └── mapPriceLevel.ts    # Price level mapping
│   │   ├── App.css                 # Main application styles
│   │   ├── App.tsx                 # Main App component
│   │   ├── Constants.ts            # Application constants
│   │   ├── index.css               # Global styles
│   │   ├── main.tsx                # React entry point
│   │   ├── types.ts                # TypeScript type definitions
│   │   └── vite-env.d.ts          # Vite environment types
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                          # Node.js backend
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── restaurantController.ts # Restaurant search controller
│   │   ├── middleware/
│   │   │   └── errorHandler.ts      # Error handling middleware
│   │   ├── routes/
│   │   │   └── restaurantRoutes.ts  # API route definitions
│   │   ├── services/
│   │   │   ├── helpers/
│   │   │   │   ├── api.ts           # API utility functions
│   │   │   │   ├── transformers.ts  # Data transformation utilities
│   │   │   │   └── utils.ts         # General utility functions
│   │   │   ├── prompts/
│   │   │   │   ├── geminiPromptBuilder.ts # AI prompt construction
│   │   │   │   └── foursquareService.ts   # Foursquare API integration
│   │   │   └── geminiService.ts     # Google Gemini AI service
│   │   ├── index.ts                 # Server entry point
│   │   └── types.ts                 # TypeScript type definitions
│   ├── .env                         # Environment variables (DO NOT COMMIT)
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   └── tsconfig.app.json
│
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Foursquare Developer Account
- Google AI Studio Account (for Gemini API)

### API Keys Setup

1. **Foursquare API Key**:

   - Visit [Foursquare Developers](https://developer.foursquare.com/)
   - Create an account and generate an API key

2. **Google Gemini API Key**:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create an API key for Gemini

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/JMarkDev/LLM-Driven-Restaurant-Finder-App.git
   cd LLM-Driven-Restaurant-Finder-App
   ```

2. **Install server dependencies**:

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `server` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FOURSQUARE_API_KEY=your_foursquare_api_key_here
PORT=3001
NODE_ENV=development
```

**⚠️ Important**: Never commit your actual API keys to version control. The `.env` file should be added to `.gitignore`.

### Running the Application

1. **Start the backend server**:

   ```bash
   cd server
   npm run dev
   ```

   The server will run on `http://localhost:3001`

2. **Start the frontend client** (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173/`

## 📝 Usage Examples

### Basic Search

```
"Find Italian restaurants near me"
```

### Advanced Search

```
"I want a highly-rated Thai restaurant in Manhattan that's open now and not too expensive"
```

### Specific Requirements

```
"Show me vegetarian restaurants in San Francisco with outdoor seating and good reviews"
```

## 🔧 API Endpoints

### POST `/api/execute`

Processes natural language restaurant search queries.

**Request Body**:

```json
{
  "message": "Find me a cheap sushi restaurant in downtown Los Angeles that's open now"
}
```

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "name": "Sushi Gen",
      "address": "422 E 2nd St, Los Angeles, CA 90012",
      "cuisine": "Japanese",
      "rating": 4.5,
      "price_level": 2,
      "hours": "11:00 AM - 9:00 PM",
      "open_now": true
    }
  ]
}
```

## 🛠️ Development

### Building for Production

**Backend**:

```bash
cd server
npm run build
npm start
```

**Frontend**:

```bash
cd client
npm run build
```

### Code Structure

#### Backend Services

- `geminiService.ts`: Handles AI query conversion
- `foursquareService.ts`: Manages Foursquare API interactions
- `restaurantRoutes.ts`: Defines API routes

#### Frontend Components

- `SearchForm.tsx`: User input interface
- `ResultsSection.tsx`: Displays search results
- `Card.tsx`: Individual restaurant result cards

## 🔒 Security Features

- API keys stored in environment variables
- Input validation and sanitization
- Error handling for malformed requests
- CORS configuration for cross-origin requests

## 🐛 Error Handling

The application handles various error scenarios:

- Invalid API keys
- Network connectivity issues
- Malformed user input
- API rate limiting
- Empty search results

## 📊 Technologies Used

### Frontend

- React 18
- TypeScript
- CSS Modules
- Axios for HTTP requests

### Backend

- Node.js
- Express.js
- TypeScript
- Google Generative AI (Gemini)
- Foursquare Places API
- dotenv for environment management

## 🚧 Known Limitations

- API rate limits may apply based on your Foursquare plan
- Search results are limited to the Foursquare database
- Natural language processing accuracy depends on query clarity
- Currently supports English language queries only
