import Hospital from '../models/Hopital.js';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import transporter from '../config/db.js';





dotenv.config();


const validateHospital = [
    body('name').isString().notEmpty().withMessage('Le nom est requis.'),
    body('address').isString().notEmpty().withMessage('L\'adresse est requise.'),
    body('contact').isString().notEmpty().withMessage('Le contact est requis.'),
    body('email').isString().notEmpty().withMessage('L\'email est requis.'),
    //body('latitude').isNumeric().notEmpty().withMessage('La latitude est requise.'),
    //body('longitude').isNumeric().notEmpty().withMessage('La longitude est requise.'),
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

        
        const mailOptions = {
            from: process.env.user,
            to: req.body.contactEmail,
            subject: 'Confirmation de la création de l\'hôpital',
            text: `L'hôpital ${hospital.name} a été créé avec succès !`,
            
        };
        console.log(mailOptions);

        await transporter.sendMail(mailOptions);

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
