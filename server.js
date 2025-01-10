import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import midwifeRoutes from './routes/midwifeRoutes.js';
import patientesRoutes from './routes/patientesRoutes.js';
import appointmentRoutes from './routes/AppoitmentRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';





dotenv.config();
const app = express();
const PORT = process.env.PORT;



connectToDatabase();

// Middleware pour permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    // Gérer les requêtes OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); 
    }
  
    next(); 
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







// Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/Sage_femmes', midwifeRoutes);
app.use('/api/patientes', patientesRoutes);
app.use('/api/Rendez_Vous', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/taches', taskRoutes);
//app.use('/api/statistics', statisticRoutes);
//app.use('/api/notifications', notificationRoutes);
//app.use('/api/resources', resourceRoutes);
//app.use('/api/histories', historyRoutes);




app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    
} );