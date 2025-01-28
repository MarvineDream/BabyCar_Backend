import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { generateToken } from './jwt.js';
import bcrypt from 'bcrypt';





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


export const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ username });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {

                if (!mongoose.Types.ObjectId.isValid(admin._id)) {
                    return res.status(500).json({ message: 'ID d\'administrateur invalide' });
                }
                
                const token = generateToken(admin._id, admin.role);
                res.status(200).json({ token, admin });
            } else {
                res.status(401).json({ message: 'Identifiants invalides' });
            }
        } else {
            res.status(401).json({ message: 'Identifiants invalides' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error.message });
    }
};

