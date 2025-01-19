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


// Mise à jour d'une sage-femme
export const updateMidwife = async (req, res) => {
  try {
    const { name } = req.body;
    const midwife = await Midwife.findByIdAndUpdate(
      req.params.midwifeId,
      { name },
      { new: true }
    );

    if (!midwife) {
      return res.status(404).send('Sage-femme non trouvée');
    }
    res.send(midwife);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Suppression d'une sage-femme
export const deleteMidwife = async (req, res) => {
  try {
    const midwife = await Midwife.findByIdAndDelete(req.params.midwifeId);

    if (!midwife) {
      return res.status(404).send('Sage-femme non trouvée');
    }
    // Suppression de la sage-femme de l'hôpital
    const hospital = await hospital.findById(midwife.hospital);
    hospital.midwives.pull(midwife._id);
    await hospital.save();

    res.send(midwife);
  } catch (error) {
    res.status(500).send(error);
  }
};