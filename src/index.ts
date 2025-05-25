import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouter from './routes/generate.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// endpoint
app.use('/api/generate', generateRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
