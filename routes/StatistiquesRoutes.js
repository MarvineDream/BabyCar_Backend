import express from 'express';
import { getStatisticById } from '../controllers/statistiControllers.js';


const router = express.Router();

//router.get('/', getStatistics);
router.get('/:id', getStatisticById);


export default router;
