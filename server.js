import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import contactHandler from './api/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for contact form
app.all('/api/contact', (req, res) => {
  contactHandler(req, res);
});

// Serve static assets from project root
app.use(express.static(__dirname));

// Fallback to index.html for SPA/root navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
