import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { readFileSync, unlinkSync } from 'fs';

const app = express();
const upload = multer({ dest: '/tmp/valoris-analyzer-uploads/' });

const GLADIA_KEY = process.env.VITE_GLADIA_API_KEY || '2cb3c89c-2833-4334-ab1d-3f6892bbcf01';
const GLADIA_BASE = 'https://api.gladia.io/v2';
const PORT = 3088;

app.use(cors());
app.use(express.json());

// Proxy: Upload audio
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const fileBuffer = readFileSync(req.file.path);
    const blob = new Blob([fileBuffer], { type: req.file.mimetype });
    const formData = new FormData();
    formData.append('audio', blob, req.file.originalname);

    const response = await fetch(`${GLADIA_BASE}/upload`, {
      method: 'POST',
      headers: { 'x-gladia-key': GLADIA_KEY },
      body: formData,
    });

    try { unlinkSync(req.file.path); } catch {}

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy: Start transcription
app.post('/api/transcription', async (req, res) => {
  try {
    const response = await fetch(`${GLADIA_BASE}/transcription`, {
      method: 'POST',
      headers: {
        'x-gladia-key': GLADIA_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...req.body, diarization: true }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Transcription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy: Get transcription result
app.get('/api/transcription/:id', async (req, res) => {
  try {
    const response = await fetch(`${GLADIA_BASE}/transcription/${req.params.id}`, {
      headers: { 'x-gladia-key': GLADIA_KEY },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Result error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gladia proxy running on http://0.0.0.0:${PORT}`);
});
