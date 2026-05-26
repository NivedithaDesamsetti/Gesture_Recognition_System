const express = require('express');
const app = express();
const port = 3000;

// To parse JSON request bodies
app.use(express.json());

// In-memory storage for settings (replace with DB in real app)
let userSettings = {
  darkMode: false,
  audioEnabled: true,
  sensitivity: 5
};

// CORS middleware (if frontend served separately)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins, restrict in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// GET current settings
app.get('/api/settings', (req, res) => {
  res.json(userSettings);
});

// POST update settings
app.post('/api/settings', (req, res) => {
  const { darkMode, audioEnabled, sensitivity } = req.body;
  // Basic validation
  if (typeof darkMode !== 'boolean' ||
      typeof audioEnabled !== 'boolean' ||
      typeof sensitivity !== 'number' ||
      sensitivity < 1 || sensitivity > 10) {
    return res.status(400).json({ error: 'Invalid settings data' });
  }

  // Save new settings
  userSettings = { darkMode, audioEnabled, sensitivity };
  res.json({ message: 'Settings saved successfully', settings: userSettings });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
