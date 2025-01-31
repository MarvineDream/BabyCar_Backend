import Appointment from '../models/Appoitment.js';




export const createAppointment = async (req, res) => {
    try {
        const { midwife: midwifeId, patient, date } = req.body; 

        // Vérifiez si les champs requis sont fournis
        if (!midwifeId || !patient || !date) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        const midwife = await midwife.findById(midwifeId);
        
        if (!midwife) {
            return res.status(403).send({ message: 'Seules les sages-femmes peuvent créer des rendez-vous.' });
        }

        // Créez le rendez-vous
        const appointment = new Appointment({
            midwife: midwifeId,
            patient,
            date,
        });

        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        console.error('Erreur lors de la création du rendez-vous:', error);
        res.status(500).send({ message: 'Erreur lors de la création du rendez-vous.', error });
    }
};

export const getAppointments = async (req, res) => {
    try {
        // Récupération des rendez-vous avec les informations de la sage-femme et du patient
        const appointments = await Appointment.find()
            .populate('midwife', 'name email') 
            .populate('patiente', 'name email');

        if (!appointments.length) {
            return res.status(404).send({ message: 'Aucun rendez-vous trouvé.' });
        }

        res.status(200).send(appointments);
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération des rendez-vous.', error });
    }
};



export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('midwife')
            .populate('patient');
        
        if (!appointment) {
            return res.status(404).send({ message: 'Rendez-vous non trouvé' });
        }
        
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!appointment) {
            return res.status(404).send({ message: 'Rendez-vous non trouvé' });
        }
        
        res.send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        
        if (!appointment) {
            return res.status(404).send({ message: 'Rendez-vous non trouvé' });
        }
        
        res.send({ message: 'Rendez-vous supprimé avec succès' });
    } catch (error) {
        res.status(500).send(error);
    }
};



// Fonction pour confirmer le rendez-vous
export const ConfirmAppointment = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;

        // Vérification des champs requis
        if (!appointmentId || !status) {
            return res.status(400).send({ message: 'Tous les champs sont requis.' });
        }

        // Vérification du statut
        const validStatuses = ['confirmé', 'annulé']; 
        if (!validStatuses.includes(status)) {
            return res.status(400).send({ message: 'Statut invalide.' });
        }

        const appointment = await visitorAppointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).send({ message: 'Demande de rendez-vous non trouvée.' });
        }

        appointment.statut = status;
        await appointment.save();

        const mailOptions = {
            from: Hospital.email,
            to: appointment.visitorRequest.email,
            subject: 'Confirmation de votre rendez-vous',
            text: `Bonjour ${appointment.visitorRequest.name},\n\nVotre demande de rendez-vous a été ${status}.\n\nMerci,\nL'équipe de l'hôpital.`,
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: 'Statut de la demande mis à jour avec succès et confirmation envoyée au visiteur.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la demande:', error); 
        res.status(500).send({ message: 'Erreur lors de la mise à jour de la demande.', error });
    }
};
