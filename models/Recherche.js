import mongoose from 'mongoose';

const elementSchema = new mongoose.Schema({
  nom: String,
  description: String,
});

const Element = mongoose.model('Element', elementSchema);

export default Element;
