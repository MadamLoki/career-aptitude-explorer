import { Router } from 'express';
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');
const { register, login, logout } = require('../controllers/auth');
import jobRoutes from '../api/jobs';

const router = Router();

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

export default router;
