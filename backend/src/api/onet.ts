// backend/src/api/onet.ts
import { Router } from 'express';
import onetService from '../services/OnetService.js';

const router = Router();

router.get('/questions', async (req, res) => {
    try {
        const { start = 1, end = 12 } = req.query;
        
        console.log('Fetching O*NET questions:', { start, end });

        if (!Number.isInteger(Number(start)) || !Number.isInteger(Number(end))) {
            return res.status(400).json({
                error: 'Invalid parameters',
                details: 'Start and end must be integers'
            });
        }

        const data = await onetService.getInterestProfilerQuestions(
            Number(start),
            Number(end)
        );

        return res.json(data);
    } catch (error) {
        console.error('Error fetching O*NET questions:', error);
        return res.status(500).json({
            error: 'Failed to fetch questions from O*NET',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Add endpoint for submitting answers
router.post('/results', async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({
                error: 'Invalid input',
                details: 'Answers must be provided as an object'
            });
        }

        const results = await onetService.getInterestProfilerResults(answers);
        return res.json(results);
    } catch (error) {
        console.error('Error fetching O*NET results:', error);
        return res.status(500).json({
            error: 'Failed to fetch results from O*NET',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;