import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
    }

    try {
        // Vérifier si l'admin existe déjà
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Ce nom d\'utilisateur est déjà pris.' });
        }

        // Cryptage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword, role });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin créé avec succès' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Erreur lors de la création de l\'admin' });
    }
};





export const login = async (req, res) => {
    const { username, password } = req.body;

    
    if (!username || !password) {
        return res.status(400).json({ message: 'Tous les champs requis doivent être fournis.' });
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Génération du token
        const token = jwt.sign({ id: admin._id, role: admin.role }, 'votre_clé_secrète', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des admins' });
    }
};


export const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin non trouvé' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'admin' });
    }
};


export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { 
                username, 
                password: hashedPassword !== undefined ? hashedPassword : undefined, 
                role 
            },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin non trouvé' });
        }

        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'admin' });
    }
};


export const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin non trouvé' });
        }
        res.json({ message: 'Admin supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'admin' });
    }
};

