import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
    date_consultation: { type: Date, required: true },
    type: { type: String, required: true },
    notes: { type: String, required: true },
    patiente: { type: mongoose.Schema.Types.ObjectId, ref: 'Patiente', required: true },
},
{ timestamps: true });

export default mongoose.model('Consultation', consultationSchema);
