# Supermarket Chatbot Frontend

Modern React-based user interface for the Supermarket Chatbot application. Built with React 19, Tailwind CSS, and Lucide React icons.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Backend server running on `http://localhost:8000`

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.
- Opens [http://localhost:3000](http://localhost:3000) in your browser
- The page reloads when you make changes
- Lint errors appear in the console

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
- Bundles and optimizes React in production mode
- Minifies files and includes content hashes
- Ready for deployment

### `npm run eject`
**Note:** One-way operation. Gives you full control over configuration.

## 🎨 Tech Stack

- **React 19.2.8**: Latest React library for UI components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful SVG icon library
- **React Scripts 5.0.1**: Build tool and development server
- **Testing Library**: Unit and integration testing

## 🏗️ Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Application styles
├── index.js        # React entry point
├── index.css       # Global styles
├── setupTests.js   # Test configuration
└── reportWebVitals.js  # Performance monitoring

public/
├── index.html      # HTML template
├── manifest.json   # PWA manifest
└── robots.txt      # SEO robots file
```

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:8000`.

**Chat Endpoint:**
- Method: POST
- URL: `http://localhost:8000/chat`
- Request: `{ "user_input": "user query" }`
- Response: `{ "locations": [...], "unrecognized": [...] }`

## 🎯 Features

- Clean, intuitive user interface
- Real-time product search
- Product location display
- Responsive design for all devices
- Error handling and user feedback

## 🚀 Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. The `build` folder contains static files ready for deployment

3. Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Create React App Documentation](https://create-react-app.dev/)

## 🐛 Troubleshooting

- **API Connection Errors**: Ensure the backend server is running on port 8000
- **Module Not Found**: Run `npm install` to install all dependencies
- **Port Already in Use**: Change the port by setting `PORT=3001` before running `npm start`
- **Build Failures**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
