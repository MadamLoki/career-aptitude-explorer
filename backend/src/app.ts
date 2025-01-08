import express, { Express } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './api/routes/routes';
import assessmentRoutes from './api/assessment';
import careerRoutes from './api/careers';
import jobRoutes from './api/jobs';  // Add this import
import cors from 'cors';  // Add CORS

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
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});