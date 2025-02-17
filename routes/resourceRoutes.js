import express from 'express';
import { createResource, deleteResource, getAllResources, getResourceById, updateResource } from '../controllers/ressourceControllers.js';


const router = express.Router();


router.post('/', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);


export default router;