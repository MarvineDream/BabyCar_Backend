import express from 'express';
import { deleteAdmin, getAdminById, getAllAdmins, login, register, updateAdmin } from '../controllers/AdminControllers.js';


const router = express.Router();




// Route pour récupérer tous les admins
router.get('/', getAllAdmins);

router.post('/Register', register);

router.post('/Login', login);

// Route pour récupérer un admin par ID
router.get('/:id',  getAdminById);

// Route pour mettre à jour un admin
router.put('/:id', updateAdmin);

// Route pour supprimer un admin
router.delete('/:id', deleteAdmin);

export default router;