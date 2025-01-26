import express from 'express';
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from '../controllers/patientesControllers.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();


// Route pour créer un patient : accessible aux sages-femmes
router.post('/', authenticate, authorize(['sage-femme']), createPatient);

// Route pour récupérer tous les patients : accessible aux sages-femmes et a l'admin de l'hopital
router.get('/', authenticate, authorize(['sage-femme', 'hospitalAdmin']), getPatients);

// Route pour récupérer un patient par ID : accessible aux sages-femmes et a l'admin de l'hopital
router.get('/:id', authenticate, authorize(['sage-femme', 'hospitalAdmin']), getPatientById);

// Route pour mettre à jour un patient : accessible aux sages-femmes et a l'admin de l'hopital
router.put('/:id', authenticate, authorize(['sage-femme', 'hospitalAdmin']), updatePatient);

// Route pour supprimer un patient : accessible aux sages-femmes et a l'admin de l'hopital
router.delete('/:id', authenticate, authorize(['sage-femme', 'hospitalAdmin']), deletePatient);

export default router;
