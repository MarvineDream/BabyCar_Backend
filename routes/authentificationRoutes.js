import express from 'express';
import { login } from '../middleware/auth.js';
import { register } from '../controllers/AdminControllers.js';





const router = express.Router();




// Route pour se connecter
router.post('/Login', login);

// Route pour créer un utilisateur ( admin )
router.post('/Register', register);







export default router;
