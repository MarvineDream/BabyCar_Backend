import mongoose from 'mongoose';

const patienteSchema = new mongoose.Schema({
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    age: { type: Number, required: true },
    password: { type: String, required: true },
    numero_de_telephone: { type: String, required: true},
    email: { type: String, required: true},
    semaine_grossesse: { type: Number, required: true },
    statut: { type: String, enum: ['suivi régulier', 'complication'], required: true },
    prochain_rendez_vous: { type: Date, required: true },
    midwives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'midwives' }] 
},
{ timestamps: true });

export default mongoose.model('Patiente', patienteSchema);
