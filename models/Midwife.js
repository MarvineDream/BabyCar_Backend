import mongoose from 'mongoose';

const midwifeSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    mot_de_passe: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    taches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
},
{ timestamps: true });

export default mongoose.model('Midwife', midwifeSchema);
