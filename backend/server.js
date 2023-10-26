const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path'); 

app.use(helmet.frameguard());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for searching iTunes and Apple Books
app.get('/api/search', async (req, res) => {
  const term = req.query.term || '';
  const media = req.query.media || 'all';

  try {
    // Construct the iTunes Search API URL
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=${media}&limit=30`;
    
    // Make a request to the iTunes Search API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the iTunes Search API response to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error searching iTunes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Serve the React app's 'index.html' for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Create a router for additional routes
const router = express.Router();

// Define a route for searching iTunes and Apple Books using the router
router.get('/search', async (req, res) => {
  const term = req.query.term || ''; // Get the search term from the query parameter
  const media = req.query.mediaType || 'all'; // Default to searching all media types

  try {
    // Make a request to the iTunes Search API using the specified term and media type
    const apiUrl = `https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the iTunes Search API response to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error searching iTunes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route for testing purposes with hardcoded values
router.get('/searchTest', async (req, res) => {
  const term = 'Batman'; // Hardcoded search term
  const media = 'all'; // Hardcoded media type

  try {
    // Make a request to the iTunes Search API with hardcoded values
    const apiUrl = `https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the iTunes Search API response to the frontend
    res.json(data);
  } catch (error) {
    console.error('Error searching iTunes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/api', router); // Mount the router under the '/api' path
