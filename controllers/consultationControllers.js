import Consultation from '../models/Consultation.js';

export const createConsultation = async (req, res) => {
    try {
        const consultation = new Consultation(req.body);
        await consultation.save();
        res.status(201).send(consultation);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find()
            .populate('patient'); 
        res.send(consultations);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getConsultationById = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id)
            .populate('patient');
        
        if (!consultation) {
            return res.status(404).send({ message: 'Consultation non trouvée' });
        }
        
        res.send(consultation);
    } catch (error) {
        res.status(500).send(error);
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
