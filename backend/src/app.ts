import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import authRoutes from './api/routes/routes.js';
import assessmentRoutes from './api/assessment.js';
import careerRoutes from './api/careers.js';
import jobRoutes from './api/jobs.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Add CORS middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);  // Add job routes

// Add a test route
app.get('/test', (_req, res) => {
    res.json({ message: 'Server is working!' });
});

// Database connection and server start
connectToDatabase().then((sequelize) => {
    sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});