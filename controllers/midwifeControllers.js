import Midwife from '../models/Midwife.js';
import Hospital from '../models/Hopital.js';
import transporter from '../config/db.js';
import bcrypt from 'bcrypt';




// Création d'une sage-femme
export const createMidwife = async (name, hospitalId, email, password) => {
  // Validation des données d'entrée
  if (!name || !hospitalId || !email || !password) {
    throw new Error('Tous les champs sont requis.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newMidwife = new Midwife({ 
    name, 
    hospital: hospitalId, 
    email,
    password: hashedPassword 
  });

  await newMidwife.save();

  // Ajout de la sage-femme à l'hôpital
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) {
    throw new Error('Hôpital non trouvé.');
  }
  hospital.midwives.push(newMidwife._id);
  await hospital.save();

  const mailOptions = {
    from: '', 
    to: email, 
    subject: 'Confirmation de la création de votre compte',
    text: `Bonjour ${name},\n\nVotre inscription en tant que sage-femme a été réussie ! Voici vos informations de connexion :\n\nNom: ${name}\nHôpital: ${hospital.name}\n\nMot de passe: ${password}\n\nBienvenu parmi nous !`,
  };
  
  await transporter.sendMail(mailOptions);

  return newMidwife;
};

// Connexion d'une sage-femme
export const login = async (email, password) => {
  // Validation des données d'entrée
  if (!email || !password) {
    throw new Error('Email et mot de passe sont requis.');
  }

  // Recherche de la sage-femme par email
  const midwife = await Midwife.findOne({ email });
  if (!midwife) {
    throw new Error('Aucune sage-femme trouvée avec cet email.');
  }

  // Vérification du mot de passe
  const isMatch = await bcrypt.compare(password, midwife.password);
  if (!isMatch) {
    throw new Error('Mot de passe incorrect.');
  }

  // Génération d'un token JWT pour l'authentification
  const token = jwt.sign({ id: midwife._id }, 'votre_clé_secrète', { expiresIn: '1h' });

  return {
    midwife,
    token,
  };
};


// Récupération des sages-femmes
export const getMidwives = async (req, res) => {
  try {
    const midwives = await Midwife.find({ hospital: req.params.hospitalId });
    res.send(midwives);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
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
    const hospital = await Hospital.findById(midwife.hospital);
    if (hospital) {
      hospital.midwives.pull(midwife._id);
      await hospital.save();
    }

    res.send(midwife);
  } catch (error) {
    res.status(500).send(error.message);
  }
};