import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import User from './models/User.js';
import Assessment from './models/assessment.js';
import { setupAssociations } from './models/associations.js';
import authRoutes from './api/routes/routes.js';
import assessmentRoutes from './api/assessmentApi.js';
import careerRoutes from './api/careers.js';
import { getJobs } from './controllers/jobController.js';
import onetRoutes from './api/onet.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app: Express = express();
const port = process.env.PORT || 3000;

//home route
app.use(express.static(path.join(__dirname, '../')));

// Add CORS middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessmentApi', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', getJobs);
app.use('/api/onet', onetRoutes);

// Add a test route
app.get('/test', (_req, res) => {
    res.json({ message: 'Server is working!' });
});

// Function to log registered routes
const logRoutes = () => {
    interface Route {
        path: string;
        methods: string[];
    }

    const routes: Route[] = app._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => ({
            path: r.route.path,
            methods: Object.keys(r.route.methods)
        }));

    console.log('Registered Routes:');
    routes.forEach(route => {
        console.log(`${route.path} [${route.methods.join(', ').toUpperCase()}]`);
    });
};

// Start server function
const startServer = async () => {
    try {
        // Connect to database
        await connectToDatabase();
        console.log('Database connection established');

        // Setup associations and sync models
        setupAssociations();
        await User.sync({ force: false, alter: true });
        await Assessment.sync({ force: false, alter: true });
        console.log('Database models synced');

        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            logRoutes();
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

// Initialize server
startServer();