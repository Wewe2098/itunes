const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Define a route to search iTunes and Apple Books
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

module.exports = router;
