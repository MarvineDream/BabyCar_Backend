import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';



export const register = async (req, res) => {
    const { username, password, email, role, hospital } = req.body; 
    console.log(req.body);
    

    // Validation des données
    if (!email || !username || !password || !role) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Vérifiez si l'email existe déjà
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel administrateur
        const newAdmin = new Admin({
            username, 
            password: hashedPassword,
            email, 
            role,
            hospital, 
        });

        await newAdmin.save();

        res.status(201).json(newAdmin);
    } catch (error) {
        // Gestion des erreurs
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Un administrateur avec cet email existe déjà.' });
        }
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    // Validation des données
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    try {
        // Vérifiez si l'administrateur existe
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifiez le mot de passe
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(`Comparaison du mot de passe pour ${email}: ${isMatch}`);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Créez un jeton JWT
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            token,
            admin: {
                username: admin.username,
                email: admin.email,
                role: admin.role,
                hospital: admin.hospital
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
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