import Visitor from "../models/Visitor.js";



// Fonction pour demander un rendez-vous pour les visiteurs
export const VisitorAppointment = async (req, res) => {
    try {
        const { hospitalId, date, visitorName, visitorContact, visitorMail } = req.body;

        if (!hospitalId || !date || !visitorName || !visitorContact || !visitorMail) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        const visitorAppointment = new visitorAppointment({
            hospital: hospitalId,
            visitorRequest: {
                name: visitorName,
                contact: visitorContact,
                email: visitorMail,
            },
            date,
            statut: 'en attente', // Par défaut, le statut est 'en attente'
        });

        await visitorAppointment.save();
        res.status(201).send({ message: 'Demande de rendez-vous enregistrée avec succès.', visitorAppointment });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la demande.', error });
    }
};