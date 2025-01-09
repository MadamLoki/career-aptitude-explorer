// Assessment routes for creating and retrieving assessments
import { Router } from 'express';
import { Assessment } from '../models/assessment.js';
import authenticateToken, { AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Create a new assessment for an authenticated user
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
        const newAssessment = await Assessment.create({
            userId: req.user?.id,
            ...req.body
        });
        res.status(201).json(newAssessment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create assessment' });
    }
});

// Get all assessment results for an authenticated user
router.get('/results', authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
        const assessments = await Assessment.findAll({
            where: { userId: req.user?.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(assessments);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch results' });
    }
});

export default router;