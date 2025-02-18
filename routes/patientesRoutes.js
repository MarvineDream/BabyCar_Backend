import express from 'express';
import { createPatient, deletePatient, getPatientById, getPatients, loginPatient, updatePatient } from '../controllers/patientesControllers.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();




router.post('/Login', loginPatient);

// Route pour créer un patient : accessible aux sages-femmes
router.post('/:midwifeId', createPatient);

// Route pour récupérer tous les patients : accessible aux sages-femmes
router.get('/', authenticate, getPatients);

// Route pour récupérer un patient par ID : accessible aux sages-femmes et a l'admin de l'hopital
router.get('/:id', getPatientById);

// Route pour mettre à jour un patient : accessible aux sages-femmes et a l'admin de l'hopital
router.put('/:id', updatePatient);

// Route pour supprimer un patient : accessible aux sages-femmes et a l'admin de l'hopital
router.delete('/:id', deletePatient);

export default router;
