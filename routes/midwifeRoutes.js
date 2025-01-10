import express from 'express';
import { createMidwife, getMidwives } from '../controllers/midwifeControllers.js';

const router = express.Router();

router.post('/', createMidwife);
router.get('/', getMidwives);

export default router;
