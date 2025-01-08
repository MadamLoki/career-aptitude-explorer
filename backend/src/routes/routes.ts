import { Router } from 'express';

const router = Router();

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
