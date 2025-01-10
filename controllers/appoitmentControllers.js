import Appointment from '../models/Appoitment.js';




export const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('midwife')
            .populate('patient');
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error);
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
