import express from 'express';
import { createConsultation, deleteConsultation, getConsultationById, getConsultations, updateConsultation } from '../controllers/consultationControllers.js';
import { authenticate, authorize } from '../middleware/auth.js';


const router = express.Router();

// Route pour créer une consultation : accessible uniquement aux sages-femmes
router.post('/', authenticate, authorize(['midwife']), createConsultation);

// Route pour récupérer toutes les consultations : accessible aux sages-femmes et à l'admin de l'hôpital
router.get('/', authenticate, authorize(['midwife', 'hospitalAdmin']), getConsultations);

// Route pour récupérer une consultation par ID : accessible aux sages-femmes et à l'admin de l'hôpital
router.get('/:id', authenticate, authorize(['midwife', 'hospitalAdmin']), getConsultationById);

// Route pour mettre à jour une consultation : accessible aux sages-femmes et à l'admin de l'hôpital
router.put('/:id', authenticate, authorize(['midwife', 'hospitalAdmin']), updateConsultation);

// Route pour supprimer une consultation : accessible aux sages-femmes et à l'admin de l'hôpital
router.delete('/:id', authenticate, authorize(['midwife', 'hospitalAdmin']), deleteConsultation);

export default router;