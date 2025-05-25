import { generateImage } from '../src/services/starryai.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string.' });
  }

  try {
    const imageUrl = await generateImage(prompt);
    console.log("--------------------------executed under api folder in root directory-----------------")
    res.status(200).json({ images: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image generation failed' });
  }
}
