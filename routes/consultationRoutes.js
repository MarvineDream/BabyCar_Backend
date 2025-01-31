import express from 'express';
import { createConsultation, deleteConsultation, getConsultationById, getConsultations, updateConsultation } from '../controllers/consultationControllers.js';
//import { authenticate, authorize } from '../middleware/auth.js';


const router = express.Router();

// Route pour créer une consultation : accessible uniquement aux sages-femmes
router.post('/creer', createConsultation);

// Route pour récupérer toutes les consultations : accessible aux sages-femmes et à l'admin de l'hôpital
router.get('/', getConsultations);

// Route pour récupérer une consultation par ID : accessible aux sages-femmes et à l'admin de l'hôpital
router.get('/:id', getConsultationById);

// Route pour mettre à jour une consultation : accessible aux sages-femmes et à l'admin de l'hôpital
router.put('/:id', updateConsultation);

// Route pour supprimer une consultation : accessible aux sages-femmes et à l'admin de l'hôpital
router.delete('/:id', deleteConsultation);

export default router;