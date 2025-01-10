import Midwife from '../models/Midwife.js';
import Task from '../models/Task.js';




export const createTask = async (description, statut) => {
    try {
        
        const newTask = new Task({
            description,
            statut
        });

        
        await newTask.save();

        console.log('Tâche créée avec succès !', newTask);
        return newTask; 
    } catch (error) {
        console.error('Erreur lors de la création de la tâche :', error.message);
        throw error; 
    }
};


export const assignTaskToMidwife = async (taskId, midwifeId) => {
    try {
        
        const task = await Task.findById(taskId);
        const midwife = await Midwife.findById(midwifeId);
        
        if (!task) {
            throw new Error('Tâche non trouvée.');
        }
        if (!midwife) {
            throw new Error('Sage-femme non trouvée.');
        }

        task.sage_femme.push(midwifeId);
        midwife.taches.push(taskId);
        
        await task.save();
        await midwife.save();
        
        console.log('Tâche attribuée avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'attribution de la tâche :', error.message);
    }
};

export const getAllTasks = async () => {
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error.message);
        throw error;
    }
};

export const getTaskById = async (taskId) => {
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Tâche non trouvée.');
        }
        return task;
    } catch (error) {
        console.error('Erreur lors de la récupération de la tâche :', error.message);
        throw error;
    }
};


export const updateTask = async (taskId, updateData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (!updatedTask) {
            throw new Error('Tâche non trouvée.');
        }
        console.log('Tâche mise à jour avec succès !', updatedTask);
        return updatedTask;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error.message);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            throw new Error('Tâche non trouvée.');
        }
        console.log('Tâche supprimée avec succès !');
        return deletedTask;
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche :', error.message);
        throw error;
    }
};