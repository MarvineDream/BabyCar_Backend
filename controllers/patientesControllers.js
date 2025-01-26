import Patientes from '../models/Patientes.js';
import dotenv from 'dotenv';
import transporter from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from './hospitalControllers.js';


dotenv.config();






export const createPatient = async (req, res) => {
    try {
        const { 
            nom, 
            prenom, 
            age, 
            password, 
            numero_de_telephone, 
            email, 
            semaine_grossesse, 
            statut, 
            prochain_rendez_vous 
        } = req.body;

        // Vérification des champs requis
        if (!nom || !prenom || !age || !password || !numero_de_telephone || !email || !semaine_grossesse || !statut || !prochain_rendez_vous) {
            return res.status(400).send({ message: "Tous les champs requis doivent être fournis." });
        }

        // Cryptage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de "salts"

        const patient = new Patientes({ 
            nom, 
            prenom, 
            age, 
            password: hashedPassword, 
            numero_de_telephone, 
            email, 
            semaine_grossesse, 
            statut, 
            prochain_rendez_vous: new Date(prochain_rendez_vous),
            midwives: [req.params.midwifeId]
        });

        await patient.save();

        // Envoi de l'email de confirmation
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, 
            subject: 'Confirmation de votre inscription',
            text: `Bonjour ${prenom} ${nom},\n\nVotre inscription a été réussie ! Voici vos informations de connexion :\n\nNom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nNuméro de téléphone: ${numero_de_telephone}\nEt votre mot de passe: ${password}\n\nMerci de votre confiance !`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};




const loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hospital = await hospital.findOne({ email });
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

export { loginPatient };




export const getPatients = async (req, res) => {
  try {
    const patients = await Patientes.find({ midwifeId: req.params.midwifeId });
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
};


export const getPatientById = async (req, res) => {
    try {
        const patient = await Patientes.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient non trouvé." });
        }
        res.send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
};


export const updatePatient = async (req, res) => {
    try {
        const { nom, prenom, age, numero_de_telephone, email, semaine_grossesse, statut, prochain_rendez_vous } = req.body;
        const patient = await Patientes.findByIdAndUpdate(req.params.id, { 
            nom, 
            prenom, 
            age, 
            numero_de_telephone, 
            email, 
            semaine_grossesse, 
            statut, 
            prochain_rendez_vous: new Date(prochain_rendez_vous) 
        }, { new: true });

        if (!patient) {
            return res.status(404).send({ message: "Patient non trouvé." });
        }

        res.send(patient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


export const deletePatient = async (req, res) => {
    try {
        const patient = await Patientes.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient non trouvé." });
        }
        res.send({ message: "Patient supprimé avec succès." });
    } catch (error) {
        res.status(500).send(error);
    }
};

