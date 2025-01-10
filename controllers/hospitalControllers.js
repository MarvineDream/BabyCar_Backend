import Hospital from '../models/Hopital.js';
import { body, validationResult } from 'express-validator';


const validateHospital = [
    body('name').isString().notEmpty().withMessage('Le nom est requis.'),
    body('address').isString().notEmpty().withMessage('L\'adresse est requise.'),
    body('contact').isString().notEmpty().withMessage('Le contact est requis.'),
];


const createHospital = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Des erreurs de validation ont été détectées.', 
            errors: errors.array() 
        });
    }

    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json(hospital);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'hôpital.', error: error.message });
    }
};


const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hôpital non trouvé.' });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateHospital = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hospital) {
            return res.status(404).json({ message: 'Hôpital non trouvé.' });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hôpital non trouvé.' });
        }
        res.status(200).json({ message: 'Hôpital supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { 
    createHospital, getHospitals, getHospitalById, updateHospital, deleteHospital, validateHospital };
