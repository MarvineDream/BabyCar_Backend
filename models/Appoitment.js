import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    date_heure: { type: Date, required: true },
    statut: { type: String, enum: ['en attente', 'confirmé', 'terminé'], required: true },
    type: { type: String, enum: ['confirmé', 'annulé', 'terminé'], required: true },
    midwife: { type: mongoose.Schema.Types.ObjectId, ref: 'Midwife', required: true },
    patiente: { type: mongoose.Schema.Types.ObjectId, ref: 'Patiente', required: true },
},
{ timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
