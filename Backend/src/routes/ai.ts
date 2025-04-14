import express from 'express';
import { generateMessage } from '../controllers/ai';

const router = express.Router();
router.post('/', generateMessage);
export default router;
