import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor; 
