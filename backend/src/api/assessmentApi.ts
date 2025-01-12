import { Router, Response } from 'express';
import { Assessment } from '../models/assessment.js';
import { AuthenticatedRequest } from '../types/authTypes.js';
import authenticateToken from '../middleware/authMiddleware.js';
import onetService from '../services/OnetService.js';

const router = Router();

// Create a new assessment for an authenticated user
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
        const { answers } = req.body;
        
        // Get O*NET results for the answers
        const onetResults = await onetService.getInterestProfilerResults(answers);
        
        // Create assessment with both answers and results
        const newAssessment = await Assessment.create({
            userId: req.user!.id,
            answers,
            onetResults,
            completedAt: new Date(),
            id: ''
        });
        
        res.status(201).json({
            assessment: newAssessment,
            onetResults
        });
    } catch (error) {
        // console.error('Failed to create assessment:', error);
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
        // console.error('Failed to fetch results:', error);
        res.status(400).json({ error: 'Failed to fetch results' });
    }
});

// Get a specific assessment result
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) : Promise<Response | undefined> => {
    try {
        const assessment = await Assessment.findOne({
            where: { 
                id: req.params.id,
                userId: req.user?.id 
            }
        });
        
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }
        
        return res.json(assessment);
    } catch (error) {
        //console.error('Failed to fetch assessment:', error);
        return res.status(400).json({ error: 'Failed to fetch assessment' });
    }
});

export default router;