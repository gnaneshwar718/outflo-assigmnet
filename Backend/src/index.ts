import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import campaignRoutes from './routes/campaign';
import aiRoutes from './routes/ai';
import profileRoutes from "./routes/profiles";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('✅ DB Connected'))
    .catch((err) => {
        console.error('❌ DB Connection Error:', err.message);
    });


app.use('/campaigns', campaignRoutes);
app.use('/personalized-message', aiRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));

app.use("/profiles", profileRoutes);
