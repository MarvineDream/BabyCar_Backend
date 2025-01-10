import express from 'express';
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, updateAppointment } from '../controllers/appoitmentControllers.js';


const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);


export default router;