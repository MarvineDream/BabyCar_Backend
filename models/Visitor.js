import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    hopital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hopital', required: true },
    visitorRequest: {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        email: { type: String, required: true },
        motif: { type: String, required: true },
    },
    date: { type: Date, required: true },
    statut: { type: String, default: 'en attente'},
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
