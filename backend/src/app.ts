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
import careerRoutes from './api/careers.js';
import jobRoutes from './api/jobs.js';
import { createServer } from 'http';

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessmentApi', assessmentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);

// Serve static files from the React app with proper MIME types
app.use(express.static(path.join(__dirname, '../../frontend/dist'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
        }
    }
}));

// Test route
app.get('/api/test', (_req, res) => {
    res.json({ message: 'Server is working!' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'), {
        headers: {
            'Content-Type': 'text/html'
        }
    });
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