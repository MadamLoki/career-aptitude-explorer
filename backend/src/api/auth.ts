import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            name
        });

        const token = generateToken({ id: user.id });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
});

export default router;