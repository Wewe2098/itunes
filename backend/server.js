const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");

app.use(helmet.frameguard());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for searching iTunes and Apple Books
app.get("/api/search", async (req, res) => {
  const term = req.query.term || ''; // Get the search term from the query parameter
  const media = req.query.media || 'all'; // Default to searching all media types
  const pageNumber = req.query.pageNumber || 1; // Default to page 1

  try {
    const api_url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      term
    )}&media=${mediaType}&limit=30&page=${pageNumber}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  } catch (error) {
    console.error('Error searching iTunes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Report errors
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
