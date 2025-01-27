import Visitor from '../models/Visitor.js';
import Hopital from '../models/Hopital.js'; 
import transporter from '../config/db.js'; 

export const VisitorAppointment = async (req, res) => {
    try {
        const { hospitalId, date, visitorName, visitorContact, visitorMail, motif } = req.body;

        // Vérification des champs requis
        if (!hospitalId || !date || !visitorName || !visitorContact || !visitorMail || !motif) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        // Récupérer l'hôpital par son ID
        const hospital = await Hopital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).send({ message: 'Hôpital non trouvé.' });
        }

        // Création de la demande de rendez-vous
        const visitorAppointment = new Visitor({
            hospital: hospitalId,
            visitorRequest: {
                name: visitorName,
                contact: visitorContact,
                email: visitorMail,
                motif: motif,  // Ajout du motif
            },
            date,
            statut: 'en attente',
        });

        await visitorAppointment.save();

        // Options de l'email
        const mailOptions = {
            from: visitorMail,
            to: hospital.email,
            subject: 'Demande de rendez-vous',
            text: `Vous avez reçu une nouvelle demande de rendez-vous de ${visitorName}.\n\nDétails:\nDate: ${date}\nContact: ${visitorContact}\nEmail: ${visitorMail}\nMotif: ${motif}\nStatut: en attente`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send({ message: 'Demande de rendez-vous enregistrée avec succès.', visitorAppointment });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la demande:', error);
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la demande.', error });
    }
};
