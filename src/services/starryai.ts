import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const STARRYAI_API_KEY = process.env.STARRYAI_API_KEY as string;

export async function generateImage(prompt: string): Promise<string> {
  try {
    const creationRes = await axios.post(
      'https://api.starryai.com/creations/',
      {
        model: 'cinematic',
        aspectRatio: 'square',
        highResolution: true,
        images: 1,
        steps: 1,
        initialImageMode: 'color',
        prompt
      },
      {
        headers: {
          'X-API-Key': STARRYAI_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    const creationId = creationRes.data.id;

    // Poll for result every 5 seconds (instead of blocking setTimeout)
    const pollImage = async (): Promise<string> => {
      for (let attempt = 0; attempt < 12; attempt++) {
        await new Promise(res => setTimeout(res, 5000));

        const pollRes = await axios.get(
          `https://api.starryai.com/creations/${creationId}`,
          {
            headers: {
              'X-API-Key': STARRYAI_API_KEY,
              Accept: 'application/json'
            }
          }
        );

        const images = pollRes.data.images;
        if (images?.[0]?.url) return images[0].url;
      }

      throw new Error('Timeout while waiting for image generation.');
    };

    return await pollImage();

  } catch (error) {
    console.error('StarryAI error:', error);
    throw new Error('Image generation failed');
  }
}
