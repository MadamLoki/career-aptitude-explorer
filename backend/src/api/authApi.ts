// backend/src/api/auth.ts
import { Router, Request, Response } from 'express';
import User, { UserAttributes } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { RegisterRequest, LoginRequest, AuthenticatedRequest } from '../types/authTypes.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = Router();

// Update the registration endpoint in authApi.ts
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    try {
        const { email, password, name } = req.body;
        console.log('Received registration request:', { email, name });

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Registration failed: User already exists:', email);
            return res.status(400).json({ 
                success: false,
                error: 'User already exists' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            username: name || email.split('@')[0], // Use name for username if provided
            isActive: true
        } as UserAttributes);

        console.log('User created successfully:', { id: user.id, email: user.email });

        const token = generateToken({ id: user.id, email: user.email });

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(201).json({ 
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                },
                token
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(400).json({ 
            success: false,
            error: 'Registration failed' 
        });
    }
});

router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid credentials' 
            });
        }

        const token = generateToken({ id: user.id, email: user.email });

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(400).json({ 
            success: false,
            error: 'Login failed' 
        });
    }
});

router.post('/logout', authenticateToken, (_req: Request, res: Response) => {
    res.clearCookie('token');
    return res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
        const userId = req.user?.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'email', 'username', 'createdAt', 'lastLogin']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        return res.json({
            success: true,
            data: { user }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch user profile'
        });
    }
});

export default router;