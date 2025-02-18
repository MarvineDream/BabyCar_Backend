import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'root' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital'},
},
{ timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
