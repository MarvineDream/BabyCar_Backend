import Hospital from '../models/Hopital.js';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import transporter from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


dotenv.config();



export const generateToken = (hospital) => {
    return jwt.sign(
        { id: hospital._id, email: hospital.email },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );
};

const validateHospital = [
    body('name').isString().notEmpty().withMessage('Le nom est requis.'),
    body('address').isString().notEmpty().withMessage('L\'adresse est requise.'),
    body('contact').isString().notEmpty().withMessage('Le contact est requis.'),
    body('password').isString().notEmpty().withMessage('Le mot de passe est requis.'),
    body('email').isEmail().withMessage('L\'email doit être valide.').notEmpty().withMessage('L\'email est requis.'),
    body('phone').isString().notEmpty().withMessage('Le numéro de téléphone est requis.'),
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
        const existingHospital = await Hospital.findOne({
            $or: [
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });

        /*if (existingHospital) {
            return res.status(400).json({ 
                message: 'Un hôpital avec cette adresse e-mail ou ce numéro de téléphone existe déjà.' 
            });
        } */

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hospitalData = { ...req.body, password: hashedPassword }; 

        const hospital = new Hospital(hospitalData);
        await hospital.save();

        const token = generateToken(hospital); 

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Confirmation de la création de l\'hôpital',
            text: `L'hôpital ${hospital.name} a été créé avec succès.\n\nVoici vos éléments de connexion:\nEmail: ${req.body.email}\nMot de passe: ${req.body.password}`,
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ hospital, token }); // Renvoie l'hôpital et le token
    } catch (error) {
        console.error('Erreur lors de la création de l\'hôpital:', error); // Journalisation de l'erreur
        res.status(500).json({ message: 'Erreur lors de la création de l\'hôpital.', error: error.message });
    }
};


// Fonction de connexion pour générer un token
const loginHospital = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hospital = await Hospital.findOne({ email });
        if (!hospital) {
            return res.status(404).json({ message: 'Hôpital non trouvé.' });
        }

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        generateToken(hospital);
        res.json({ hospital, token }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
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

export { createHospital, getHospitals, getHospitalById, updateHospital, deleteHospital, validateHospital, loginHospital };
