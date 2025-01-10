// backend/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import User from './models/User.js';
import Assessment from './models/assessment.js';
import { setupAssociations } from './models/associations.js';
import authRoutes from './api/authApi.js';
import assessmentRoutes from './api/assessmentApi.js';
import careerRoutes from './api/career.js';
import jobRoutes from './api/jobs.js';
import onetRoutes from './api/onetApi.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.CLIENT_URL 
        : 'http://localhost:5173',
    credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/onet', onetRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    const staticPath = path.join(__dirname, '../../frontend/dist');
    app.use(express.static(staticPath));

    // Handle React routing, return all requests to React app
    app.get('*', (_req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

// Database connection and server start
connectToDatabase()
    .then(() => {
        setupAssociations();
        return User.sync({ force: false, alter: true });
    })
    .then(() => {
        return Assessment.sync({ force: false, alter: true });
    })
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error: unknown) => {
        console.error('Unable to connect to the database or sync:', error);
    });