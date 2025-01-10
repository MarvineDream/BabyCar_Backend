import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    date_consultation: { type: Date, required: true },
    type: { type: String, required: true },
    notes: { type: String, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patientes', required: true },
},
{ timestamps: true });

export default mongoose.model('Consultation', consultationSchema);
