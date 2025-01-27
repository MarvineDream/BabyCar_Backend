import express from 'express';
import { deleteAdmin, getAdminById, getAllAdmins, login, register, updateAdmin } from '../controllers/adminControllers.js';



const router = express.Router();


// Route pour créer un admin
router.post('/Register', register);

// Route pour se connecter
router.post('/Login', login);

// Route pour récupérer tous les admins
router.get('/', getAllAdmins);

// Route pour récupérer un admin par ID
router.get('/:id',  getAdminById);

// Route pour mettre à jour un admin
router.put('/:id', updateAdmin);

// Route pour supprimer un admin
router.delete('/:id', deleteAdmin);

export default router;
