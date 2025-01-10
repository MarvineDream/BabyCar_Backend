import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date_envoi: { type: Date, required: true },
},
{ timestamps: true });

export default mongoose.model('Notification', notificationSchema);
