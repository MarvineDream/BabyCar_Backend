import Patientes from '../models/Patientes.js';
import dotenv from 'dotenv';
import transporter from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from './hospitalControllers.js';
import Patiente from '../models/Patientes.js';


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
            text: `Bonjour ${prenom} ${nom},\n\nVotre inscription a été réussie ! Voici vos informations de connexion :\n\nNom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nNuméro de téléphone: ${numero_de_telephone}\nEt votre mot de passe: ${password}\n\nBienvenue parmi nous !`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


export const loginPatient = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    // Vérification des données d'entrée
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        // Recherche de la patiente par email
        const patient = await Patientes.findOne({ email }); 
        if (!patient) {
            return res.status(404).json({ message: 'Patiente non trouvée.' });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, patient.password); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Génération du token
        const token = generateToken(patient); 
        res.json({ patient, token }); 
    } catch (error) {
        console.error('Erreur lors de la connexion du patient:', error);
        res.status(500).json({ message: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
    }
};



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

