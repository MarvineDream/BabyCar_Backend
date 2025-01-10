import express from 'express';
import { createHospital, deleteHospital, getHospitalById, getHospitals, updateHospital, validateHospital } from '../controllers/hospitalControllers.js';


const router = express.Router();

router.post('/', validateHospital, createHospital);
router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.put('/:id', validateHospital, updateHospital);
router.delete('/:id', deleteHospital);





export default router;