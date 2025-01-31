import express from 'express';
import { recherche } from '../controllers/rechercheControllers.js';



const router = express.Router();


router.get('/', recherche);

export default router;