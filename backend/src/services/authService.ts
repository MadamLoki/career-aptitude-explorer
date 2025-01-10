import { generateToken } from '../utils/jwt.js';
import User from '../models/User.js';

interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        id: string;
        username: string;
        email: string;
    };
    token: string;
}

class AuthService {
    async register(input: RegisterInput): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                email: input.email.toLowerCase()
            }
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const user = await User.create({
            username: input.username,
            email: input.email.toLowerCase(),
            password: input.password,
        });

        // Generate JWT token
        const token = generateToken({ 
            id: user.id,
            email: user.email 
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        };
    }

    async login(input: LoginInput): Promise<AuthResponse> {
        // Find user
        const user = await User.findOne({
            where: {
                email: input.email.toLowerCase()
            }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await user.verifyPassword(input.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Update last login
        await user.update({
            lastLogin: new Date()
        });

        // Generate JWT token
        const token = generateToken({ 
            id: user.id,
            email: user.email 
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        };
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Verify old password
        const isPasswordValid = await user.verifyPassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        // Update password
        await user.update({
            password: newPassword
        });

        return true;
    }
}

export const authService = new AuthService();