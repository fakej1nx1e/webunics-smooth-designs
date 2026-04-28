const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'inquiries.json');

app.use(cors());
app.use(express.json());

// Lade alle Anfragen
app.get('/inquiries', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json([]); // Datei existiert noch nicht
  }
});

// Speichere neue Anfrage
app.post('/inquiries', (req, res) => {
  const newInquiry = req.body;
  
  let inquiries = [];
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    inquiries = JSON.parse(data);
  } catch (error) {
    // Datei existiert noch nicht
  }
  
  inquiries.push(newInquiry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
  
  res.json({ success: true });
});

// Lösche einzelne Anfrage
app.delete('/inquiries/:index', (req, res) => {
  const index = parseInt(req.params.index);
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    let inquiries = JSON.parse(data);
    inquiries.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

// Lösche alle Anfragen
app.delete('/inquiries', (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
