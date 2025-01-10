import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    action: { type: String, required: true },
    date_action: { type: Date, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
},
{ timestamps: true });

export default mongoose.model('History', historySchema);
