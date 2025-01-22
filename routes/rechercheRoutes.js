import express from 'express';
import { rechercherElements } from '../controllers/rechercheControllers.js';


const router = express.Router();


router.get('/', rechercherElements);

export default router;