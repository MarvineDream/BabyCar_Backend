import express from 'express';
import { createHospital, deleteHospital, getHospitalById, getHospitals, updateHospital, validateHospital } from '../controllers/hospitalControllers.js';
import { authenticate, authorize } from '../middleware/auth.js';


const router = express.Router();

// Route pour créer un hôpital : accessible uniquement à l'admin de l'hôpital
router.post('/', createHospital);

// Route pour récupérer tous les hôpitaux : accessible uniquement à l'admin root
router.get('/', authenticate, authorize(['root']), getHospitals);

// Route pour récupérer un hôpital par son ID : accessible uniquement à l'admin root
router.get('/:id', authenticate, authorize(['root']), getHospitalById);

// Route pour mettre à jour un hôpital : accessible uniquement à l'admin de l'hôpital
router.put('/:id', authenticate, validateHospital, authorize(['hospitals', 'hospitalAdmin']), updateHospital);

// Route pour supprimer un hôpital : accessible à l'admin root et à l'admin de l'hôpital
router.delete('/:id', authenticate, authorize(['root', 'hospitalAdmin']), deleteHospital);


export default router;