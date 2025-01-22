import Patientes from '../models/Patientes.js';
import dotenv from 'dotenv';
import transporter from '../config/db.js';


dotenv.config();


export const createPatient = async (req, res) => {
    try {
        const { 
            nom, 
            prenom, 
            age, 
            numero_de_telephone, 
            email, 
            semaine_grossesse, 
            statut, 
            prochain_rendez_vous 
        } = req.body;

        if (!nom || !prenom || !semaine_grossesse || !statut || !prochain_rendez_vous) {
            return res.status(400).send({ message: "Tous les champs requis doivent être fournis." });
        }

        const patient = new Patientes({ 
            nom, 
            prenom, 
            age, 
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
            from: process.env.user,
            to: email, 
            subject: 'Confirmation de votre inscription',
            text: `Bonjour ${prenom} ${nom},\n\nVotre inscription a été réussie ! Voici vos informations de connexion :\n\nNom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nNuméro de téléphone: ${numero_de_telephone}\n\nMerci de votre confiance !`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send({ message: error.message });
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

//export const getPatientsById = async (req, res) =>