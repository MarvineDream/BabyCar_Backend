import express from 'express';
import { assignTaskToMidwife, createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/taskControllers.js';


const router = express.Router();


router.post('/', createTask);
router.post('/assign', assignTaskToMidwife);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;