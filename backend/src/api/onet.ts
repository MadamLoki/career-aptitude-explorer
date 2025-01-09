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

router.post('/results', async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({
                error: 'Invalid request',
                details: 'Answers object is required'
            });
        }

        console.log('Submitting answers to O*NET:', answers);

        const results = await onetService.call('mnm/interestprofiler/results', {
            method: 'POST',
            body: JSON.stringify({ answers }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Store results in database here if needed

        return res.json(results);
    } catch (error) {
        console.error('Error submitting O*NET results:', error);
        return res.status(500).json({
            error: 'Failed to submit assessment results',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;