import express, { Express } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/routes';
import assessmentRoutes from './api/assessment';
import careerRoutes from './api/careers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/careers', careerRoutes);

// Database connection and server start
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});