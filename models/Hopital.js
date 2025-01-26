import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true},
  address: { type: String, required: true},
  contact: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  midwives: [{type: mongoose.Schema.Types.ObjectId,ref: 'Midwife'}],
  //latitude: { type: Number, required: false },
  //longitude: { type: Number, required: false },
},
{ timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;