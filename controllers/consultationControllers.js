import Consultation from '../models/Consultation.js';
import Patientes from '../models/Patientes.js';




export const createConsultation = async (req, res) => {
    try {
        const { date_consultation, type, notes, patiente } = req.body;

        // Vérification des champs requis
        if (!date_consultation || !type || !notes || !patiente) {
            return res.status(400).json({ message: 'Tous les champs sont requis.' });
        }

        // Vérification de l'existence de la patiente
        const existingPatient = await Patientes.findById(patiente);
        if (!existingPatient) {
            return res.status(404).json({ message: 'La patiente spécifiée n\'existe pas en base de données.' });
        }

        // Création d'une nouvelle consultation
        const newConsultation = new Consultation({
            date_consultation,
            type,
            notes,
            patiente,
        });

        // Sauvegarde dans la base de données
        await newConsultation.save();

        return res.status(201).json(newConsultation); 
    } catch (error) {
        console.error('Erreur lors de la création de la consultation:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' }); 
    }
};

export const getConsultations = async (req, res) => {
    try {
        // Récupérer les consultations avec les informations de la patiente
        const consultations = await Consultation.find().populate('patiente'); 

        // Vérifier si des consultations ont été trouvées
        if (!consultations || consultations.length === 0) {
            return res.status(404).json({ message: 'Aucune consultation trouvée.' });
        }

        // Envoyer la liste des consultations
        return res.status(200).json(consultations);
    } catch (error) {
        
        console.error('Erreur lors de la récupération des consultations:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des consultations.', error });
    }
};


export const getConsultationById = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id)
            .populate('patiente'); 
        
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation non trouvée' }); 
        }
        
        return res.status(200).json(consultation); 
    } catch (error) {
        console.error('Erreur lors de la récupération de la consultation:', error); 
        return res.status(500).json({ message: 'Erreur lors de la récupération de la consultation.', error }); 
    }
};


export const updateConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!consultation) {
            return res.status(404).send({ message: 'Consultation non trouvée' });
        }
        
        res.send(consultation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findByIdAndDelete(req.params.id);
        
        if (!consultation) {
            return res.status(404).send({ message: 'Consultation non trouvée' });
        }
        
        res.send({ message: 'Consultation supprimée avec succès' });
    } catch (error) {
        res.status(500).send(error);
    }
};
