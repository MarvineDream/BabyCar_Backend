import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';
import Patientes from '../models/Patientes.js';
import Midwife from '../models/Midwife.js';




export const register = async (req, res) => {
    const { username, password, email, role } = req.body; 

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

    // Validation des données
    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    try {
        let user;

        // Recherche dans les différentes collections
        user = await Admin.findOne({ email }) ||
               await Midwife.findOne({ email }) ||
               await Patientes.findOne({ email });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Vérification de l'ID de l'utilisateur
        if (!mongoose.Types.ObjectId.isValid(user._id)) {
            return res.status(500).json({ message: 'ID d\'utilisateur invalide' });
        }

        // Génération du token
        const token = generateToken(user._id, user.role);

        // Redirection en fonction du rôle
        let redirectUrl;
        switch (user.role) {
            case 'root':
            case 'admin':
                redirectUrl = '/admin/dashboard';
                break;
            case 'midwife':
                redirectUrl = '/midwife/dashboard';
                break;
            case 'Patiente':
                redirectUrl = '/patiente/dashboard';
                break;
            default:
                return res.status(403).json({ message: 'Rôle non reconnu' });
        }

        // Réponse avec le token et l'URL de redirection
        res.status(200).json({ token, user, redirectUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
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