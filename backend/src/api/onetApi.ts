import { Router } from 'express';
import onetService from '../services/OnetService.js';

const router = Router();

// Helper function to calculate area scores based on answers
const calculateAreaScores = (answers: Record<number, number>, results: any) => {
    // Group questions by area and calculate average scores
    const areaScores: Record<string, { total: number; count: number }> = {};
    
    // Initialize area scores
    results.result.forEach((area: any) => {
        areaScores[area.area] = { total: 0, count: 0 };
    });

    // Sum up scores for each area
    Object.entries(answers).forEach(([questionId, score]) => {
        const questionArea = results.result.find((area: any) => 
            area.questions?.some((q: any) => q.id === Number(questionId))
        )?.area;

        if (questionArea && areaScores[questionArea]) {
            areaScores[questionArea].total += score;
            areaScores[questionArea].count++;
        }
    });

    // Calculate final scores (normalize to 0-100 range)
    return Object.entries(areaScores).reduce((acc: Record<string, number>, [area, scores]) => {
        acc[area] = scores.count > 0 
            ? (scores.total / (scores.count * 5)) * 100 // Assuming 5 is max score per question
            : 0;
        return acc;
    }, {});
};

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

        console.log('Raw O*NET response:', results);

        // Calculate scores for each area
        const areaScores = calculateAreaScores(answers, results);

        // Transform the results to include scores
        const transformedResults = {
            ...results,
            result: results.result.map((area: any) => ({
                ...area,
                score: areaScores[area.area] || 0
            }))
        };

        console.log('Transformed results with scores:', transformedResults);

        return res.json(transformedResults);
    } catch (error) {
        console.error('Error submitting O*NET results:', error);
        return res.status(500).json({
            error: 'Failed to submit assessment results',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;