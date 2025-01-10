import Patientes from '../models/Patientes.js';

export const createPatient = async (req, res) => {
  try {
      const { 
          nom, 
          prenom, 
          age, 
          numero_de_telephone, 
          email, 
          semaine_grossesse, 
          statut, 
          prochain_rendez_vous 
      } = req.body;

      if (!nom || !prenom || !semaine_grossesse || !statut || !prochain_rendez_vous) {
          return res.status(400).send({ message: "Tous les champs requis doivent être fournis." });
          
          
      }

      const patient = new Patientes({ 
          nom, 
          prenom, 
          age, 
          numero_de_telephone, 
          email, 
          semaine_grossesse, 
          statut, 
          prochain_rendez_vous: new Date(prochain_rendez_vous),
          midwives: [req.params.midwifeId]

      });
      

      await patient.save();

      res.status(201).send(patient);
  } catch (error) {
      res.status(400).send({ message: error.message });
  }
};



export const getPatients = async (req, res) => {
  try {
    const patients = await Patientes.find({ midwifeId: req.params.midwifeId });
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
};

//export const getPatientsById = async (req, res) =>