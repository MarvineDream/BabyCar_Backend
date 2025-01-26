import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['root', 'hospitalAdmin', 'midwife', 'patientes'], required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: false },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
