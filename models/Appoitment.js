import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    date_heure: { type: Date, required: true },
    statut: { type: String, enum: ['en attente', 'confirmé', 'terminé'], required: true },
    type: { type: String, enum: ['confirmé', 'annulé', 'terminé'], required: true },
    midwife: { type: mongoose.Schema.Types.ObjectId, ref: 'Midwife', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
},
{ timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
