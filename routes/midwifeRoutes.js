import express from 'express';
import { createMidwife, deleteMidwife, getMidwives, updateMidwife } from '../controllers/midwifeControllers.js';

const router = express.Router();

router.post('/', createMidwife);
router.get('/', getMidwives);
router.put('/:id', updateMidwife);
router.delete('/:id', deleteMidwife);

export default router;
