import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    lien: { type: String, required: true },
    description: { type: String, required: true },
},
{ timestamps: true });

export default mongoose.model('Resource', resourceSchema);
