import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';




dotenv.config();

const secret = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    console.log(token);
    

    if (!token) {
        return res.status(401).send('Token is required');
    }

    console.log('Secret:', secret); 
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = decoded; 
        next();
    });
};


export const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
};
