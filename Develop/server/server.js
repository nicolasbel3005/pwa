// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for saving content
app.post('/api/save', (req, res) => {
  const { content } = req.body;
  // Implement saving content to a database or any other storage here
  console.log('Content received on the server:', content);
  res.json({ message: 'Content saved successfully' });
});

// API endpoint for loading content
app.get('/api/load', (req, res) => {
  // Implement loading content from a database or any other storage here
  // Return the loaded content as a response
  const loadedContent = 'Content loaded from the server';
  res.json({ content: loadedContent });
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
