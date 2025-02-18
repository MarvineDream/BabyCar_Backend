import mongoose from 'mongoose';

const midwifeSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    taches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    role: { type: String, default: 'midwife'}
},
{ timestamps: true });

const Midwife = mongoose.model('Midwife', midwifeSchema);

export default Midwife;
