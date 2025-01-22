import express from 'express';
import { VisitorAppointment } from '../controllers/visitorControllers.js';



const router = express.Router();


router.post('/', VisitorAppointment);

export default router;