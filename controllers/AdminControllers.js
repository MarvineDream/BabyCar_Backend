import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/jwt.js';





export const register = async (req, res) => {
    const { adminName, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ adminName, password: hashedPassword, role });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { adminName, password } = req.body;
    try {
        const admin = await Admin.findOne({ adminName });
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = generateToken(admin._id);
            res.status(200).json({ token, admin });
        } else {
            res.status(401).json({ message: 'Identifiants invalides' });
        }
    } catch (error) {
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
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un administrateur
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { adminName, password, role } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { adminName, password: hashedPassword, role },
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
            return res.status(404).json({ message: 'Administrateur non trouvé' });
        }
        res.status(200).json({ message: 'Administrateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};