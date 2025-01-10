import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema({
    mois: { type: Date, required: true },
    nouvelles_patientes: { type: Number, required: true },
    visites_effectuees: { type: Number, required: true },
    rendezvous: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    consultations: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
    midwife: { type: mongoose.Schema.Types.ObjectId, ref: 'Midwife', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
},
{ timestamps: true });

export default mongoose.model('Statistic', statisticSchema);
