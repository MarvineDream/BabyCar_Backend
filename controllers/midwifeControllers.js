import Midwife from '../models/Midwife.js';

export const createMidwife = async (name, hospitalId) => {
  const newMidwife = new Midwife({ name, hospital: hospitalId });
  await newMidwife.save();

  // Ajout de la sage-femme à l'hôpital
  const hospital = await hospital.findById(hospitalId);
  hospital.midwives.push(newMidwife._id);
  await hospital.save();

  return newMidwife;
};


export const getMidwives = async (req, res) => {
  try {
    const midwives = await Midwife.find({ hospitalId: req.params.hospitalId });
    res.send(midwives);
  } catch (error) {
    res.status(500).send(error);
  }
};
