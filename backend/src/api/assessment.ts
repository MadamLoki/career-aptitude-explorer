// Assessment routes for creating and retrieving assessments
import { Router } from 'express';
import { Assessment } from '../models/Assessment';
import verifyToken from '../middleware/auth';

const router = Router();

// Create a new assessment for an authenticated user
router.post('/', verifyToken, async (req, res) => {
    try {
        // Create assessment with user ID from token and request body data
        const assessment = await Assessment.create({
            userId: req.user.id,
            ...req.body
        });
        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create assessment' });
    }
});

// Get all assessment results for an authenticated user
router.get('/results', verifyToken, async (req, res) => {
    try {
        // Find all assessments for the user, sorted by creation date
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