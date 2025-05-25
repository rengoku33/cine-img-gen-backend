import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouter from './routes/generate.js';
import { generateImage } from './services/starryai.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['https://imagify-frontend-sage.vercel.app/'], // Replace with your frontend domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

// T1 --- endpoint redirect to another directory
app.use('/api/generate', generateRouter);

// T2 --- handle post scenario
app.post("/", async (req, res) => {
  console.log("REQ BODY --> ", req.body)
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required and must be a string.' });
      return
    }

    const imageUrl = await generateImage(prompt);
    res.json({ images: imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//npm run dev
