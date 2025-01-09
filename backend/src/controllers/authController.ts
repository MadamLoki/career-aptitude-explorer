import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

interface UserAttributes {
    id: string;
    email: string;
    password: string;
    name: string;
}

import { Model } from 'sequelize';
interface UserInstance extends Model<UserAttributes>, UserAttributes { }

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            name
        }) as UserInstance;

        return res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        next(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }) as UserInstance | null;
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return res.json({ token, userId: user.id });
    } catch (error) {
        next(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = (_req: Request, res: Response) => {
    return res.json({ message: 'Logged out successfully' });
};