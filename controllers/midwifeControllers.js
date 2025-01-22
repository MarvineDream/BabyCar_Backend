import Midwife from '../models/Midwife.js';
import transporter from '../config/db.js';




export const createMidwife = async (name, hospitalId, email) => {
  const newMidwife = new Midwife({ name, hospital: hospitalId });
  await newMidwife.save();

  // Ajout de la sage-femme à l'hôpital
  const hospital = await hospital.findById(hospitalId);
  hospital.midwives.push(newMidwife._id);
  await hospital.save();

  
  const mailOptions = {
      from: '',
      to: email, 
      subject: 'Confirmation de votre inscription en tant que sage-femme',
      text: `Bonjour ${name},\n\nVotre inscription en tant que sage-femme a été réussie ! Voici vos informations de connexion :\n\nNom: ${name}\nHôpital: ${hospital.name}\n\nMerci de votre confiance !`,
  };

  await transporter.sendMail(mailOptions);

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