import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, 'votre_clé_secrète');
        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return res.status(401).json({ message: 'Accès refusé. Admin non trouvé.' });
        }

        req.admin = admin; // Attacher l'objet admin à la requête
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token invalide.' });
    }
};

export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
};
