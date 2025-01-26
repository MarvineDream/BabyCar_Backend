import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { deleteAdmin, getAdminById, getAllAdmins, login, register, updateAdmin } from '../controllers/adminControllers.js';



const router = express.Router();


// Route pour créer un admin
router.post('/', authenticate, authorize(['root']), register);

// Route pour se connecter
router.post('/login', login);

// Route pour récupérer tous les admins
router.get('/', authenticate, authorize(['root']), getAllAdmins);

// Route pour récupérer un admin par ID
router.get('/:id', authenticate, authorize(['root']), getAdminById);

// Route pour mettre à jour un admin
router.put('/:id', authenticate, authorize(['root']), updateAdmin);

// Route pour supprimer un admin
router.delete('/:id', authenticate, authorize(['root']), deleteAdmin);

export default router;
