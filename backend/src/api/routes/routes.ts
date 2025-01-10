import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validate.js';
import { register, login, logout } from '../../controllers/authController.js';
import jobRoutes from '../jobs.js';
import { Request, Response, NextFunction } from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Home route
router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../../index.html'));
});

// Job routes
router.use('/api/jobs', jobRoutes);

// Registration route with validation
router.post(
    '/register',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 }),
        body('username').trim().isLength({ min: 3 })
    ],
    validateRequest,
    register
);

// Login route with validation
router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').exists()
    ],
    validateRequest,
    login
);

// Logout route
router.post('/logout', logout);

// Error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Router Error:', err);
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

export default router;