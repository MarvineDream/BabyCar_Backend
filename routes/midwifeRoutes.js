import express from 'express';
import { createMidwife, deleteMidwife, getMidwives, updateMidwife } from '../controllers/midwifeControllers.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Route pour créer une sage-femme : accessible uniquement à l'admin de l'hôpital
router.post('/', authenticate, authorize(['hospitalAdmin']), createMidwife);

// Route pour récupérer toutes les sages-femmes : accessible uniquement à l'admin de l'hôpital
router.get('/', authenticate, authorize(['hospitalAdmin']), getMidwives);

// Route pour mettre à jour une sage-femme : accessible uniquement à l'admin de l'hôpital
router.put('/:id', authenticate, authorize(['hospitalAdmin']), updateMidwife);

// Route pour supprimer une sage-femme : accessible uniquement à l'admin de l'hôpital
router.delete('/:id', authenticate, authorize(['hospitalAdmin']), deleteMidwife);

export default router;
