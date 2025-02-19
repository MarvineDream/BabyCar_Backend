import express from 'express';
import { createMidwife, deleteMidwife, getMidwives, login, updateMidwife } from '../controllers/midwifeControllers.js';

const router = express.Router();



// Route pour créer une sage-femme : accessible uniquement à l'admin de l'hôpital
router.post('/cree', createMidwife);

router.post('/Login', login);

// Route pour récupérer toutes les sages-femmes : accessible uniquement à l'admin de l'hôpital
router.get('/',  getMidwives);

// Route pour mettre à jour une sage-femme : accessible uniquement à l'admin de l'hôpital
router.put('/:id',  updateMidwife);

// Route pour supprimer une sage-femme : accessible uniquement à l'admin de l'hôpital
router.delete('/:id',  deleteMidwife);

export default router;
