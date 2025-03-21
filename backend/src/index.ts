
import express, { Request, Response } from "express";
import multer from 'multer';
import dotenv from 'dotenv';
import eventRoute from './routes/eventRoute';
import authRoute from './routes/authRoutes';
import participantRoute from './routes/participantRoute';
import cors from 'cors';
dotenv.config();

import { uploadFile } from './services/uploadFileService';
const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
console.log("allowedOrigins: ", allowedOrigins);
const options: cors.CorsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : false, // Prevent empty origin issue
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());
app.use('/events', eventRoute);
app.use('/participants', participantRoute);
app.use('/api/v1/auth', authRoute);
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;

    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.');
    }
    const ouputUrl = await uploadFile(bucket, filePath, file);

    res.status(200).send(ouputUrl);
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
