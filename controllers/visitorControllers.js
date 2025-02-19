import Visitor from '../models/Visitor.js';
import Hopital from '../models/Hopital.js'; 
import transporter from '../config/db.js'; 

export const VisitorAppointment = async (req, res) => {
    try {
        const { hopital, date, name, contact, email, motif } = req.body;

        // Vérification des champs requis
        if (!hopital || !date || !name || !contact || !email || !motif) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        // Récupérer l'hôpital par son ID
        const hospital = await Hopital.findById(hopital);
        if (!hospital) {
            return res.status(404).send({ message: 'Hôpital non trouvé.' });
        }

        // Création de la demande de rendez-vous
        const visitorAppointment = new Visitor({
            hopital: hopital, 
            name: name,
            contact: contact,
            email: email,
            motif: motif,
            date: date,
            statut: 'en attente',
        });

        await visitorAppointment.save();

        // Options de l'email
        const mailOptions = {
            from: email,
            to: hospital.email,
            subject: 'Demande de rendez-vous',
            text: `Vous avez reçu une nouvelle demande de rendez-vous de ${name}.\n\nDétails:\nDate: ${date}\nContact: ${contact}\nEmail: ${email}\nMotif: ${motif}\nStatut: en attente`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send({ message: 'Demande de rendez-vous enregistrée avec succès.', visitorAppointment });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la demande:', error);
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la demande.', error });
    }
};