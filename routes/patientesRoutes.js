import express from 'express';
import { createPatient, getPatients } from '../controllers/patientesControllers.js';

const router = express.Router({ mergeParams: true });


// Route pour créer une patiente avec l'Id de la sage femme qui le fait.
router.post('/:midwifeId', createPatient);
router.get('/:midwifeId', getPatients);

export default router;
