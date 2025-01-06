import { Router } from 'express';
import { Assessment } from '../models/Assessment';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const assessment = await Assessment.create({
            userId: req.user.id,
            ...req.body
        });
        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create assessment' });
    }
});

router.get('/results', verifyToken, async (req, res) => {
    try {
        const assessments = await Assessment.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(assessments);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch results' });
    }
});

export default router;