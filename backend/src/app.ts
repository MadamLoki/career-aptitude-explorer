// backend/src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import { connectToDatabase } from './config/database.js';
import User from './models/User.js';
import Assessment from './models/assessment.js';
import { setupAssociations } from './models/associations.js';
import authRoutes from './api/authApi.js';
import assessmentRoutes from './api/assessmentApi.js';
import careerRoutes from './api/careers.js';
import jobRoutes from './api/jobs.js';
import { createServer } from 'http';
import routes from './api/routes/routes.js';
import onetRoutes from './api/onetApi.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
let server: ReturnType<typeof createServer>;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
    credentials: true
}));

// Set proper MIME types
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    } else if (req.url.endsWith('.css')) {
        res.type('text/css');
    }
    next();
});

// Serve static files from frontend build
const frontendPath = path.join(__dirname, '../../frontend/dist');
console.log('__dirname:', __dirname);
console.log('Resolved frontendPath:', frontendPath);
fs.readdir(frontendPath, (err, files) => {
    if (err) {
        console.error('Error reading frontend directory:', err);
    } else {
        console.log('Frontend directory contents:', files);
    }
});
app.use(express.static(frontendPath));

// Test route
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Server is working!' });
});


// API Routes
app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/assessmentApi', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/onet', onetRoutes);


// Catch-all route for SPA
app.get('*', (_req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        console.error(`Frontend build not found at ${indexPath}`);
        res.status(404).json({
            error: 'Frontend build not found',
            path: indexPath
        });
    }
});

// Graceful shutdown function
const shutDown = () => {
    console.log('Received kill signal, shutting down gracefully');
    if (server) {
        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    }
};

// Database connection and server start
const startServer = async () => {
    try {
        await connectToDatabase();
        console.log('✓ Database connection established successfully.');

        setupAssociations();
        await User.sync({ force: false, alter: true });
        await Assessment.sync({ force: false, alter: true });

        console.log('✓ Database models synchronized.');
        console.log('Database synced');

        server = app.listen(port, () => {
            console.log(`✓ Server running on port ${port}`);
        });

        // Handle graceful shutdown
        process.on('SIGTERM', shutDown);
        process.on('SIGINT', shutDown);

    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

// Handle port in use error
process.on('uncaughtException', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please:\n1. Stop any other servers running on this port\n2. Choose a different port using PORT environment variable\n3. Or wait a few seconds and try again`);
        process.exit(1);
    } else {
        console.error('Uncaught Exception:', error);
        process.exit(1);
    }
});

startServer();

export default app;