import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';







export const register = async (req, res) => {
    const { username, password, role } = req.body; 
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel administrateur
        const newAdmin = new Admin({
            username, 
            password: hashedPassword,
            role,
        });

        
        await newAdmin.save();

        res.status(201).json(newAdmin);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).json({ message: error.message });
    }
};



export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire un administrateur par ID
export const getAdminById = async (req, res) => {
    const { id } = req.params;
    try {
        const admins = await Admin.findById(id);
        if (!admins) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un administrateur
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedAdmin = await User.findByIdAndUpdate(
            id,
            { username, password: hashedPassword, role },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }

        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un administrateur
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};