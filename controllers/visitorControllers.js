import nodemailer from 'nodemailer';
import transporter from '../config/db.js';



// Fonction pour demander un rendez-vous pour les visiteurs
export const VisitorAppointment = async (req, res) => {
    try {
        const { hospitalId, date, visitorName, visitorContact, visitorMail } = req.body;

        if (!hospitalId || !date || !visitorName || !visitorContact || !visitorMail) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        // Récupérer l'hôpital par son ID
        const hospital = await hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).send({ message: 'Hôpital non trouvé.' });
        }

        const visitorAppointment = new visitorAppointment({
            hospital: hospitalId,
            visitorRequest: {
                name: visitorName,
                contact: visitorContact,
                email: visitorMail,
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
            text: `Vous avez reçu une nouvelle demande de rendez-vous de ${visitorName}.\n\nDétails:\nDate: ${date}\nContact: ${visitorContact}\nEmail: ${visitorMail}\nStatut: en attente`,
        };
        console.log(mailOptions);
        

        // Envoi de l'email
        await transporter.sendMail(mailOptions);

        res.status(201).send({ message: 'Demande de rendez-vous enregistrée avec succès.', visitorAppointment });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la demande.', error });
    }
};