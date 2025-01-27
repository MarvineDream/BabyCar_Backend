import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    statut: { type: String, enum: ['à faire', 'en cours', 'terminé'], required: true },
    sage_femme: [{ type: mongoose.Schema.Types.ObjectId, ref: 'midwife' }],
},
{ timestamps: true });

export default mongoose.model('Task', taskSchema);
