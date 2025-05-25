import express, { NextFunction, Request, Response } from 'express';
import { generateImage } from '../services/starryai.ts';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {

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

export default router;
