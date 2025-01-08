import { Router } from 'express';
const router = Router();

router.get('/search', async (req, res) => {
    try {
        const { what, where } = req.query;
        
        const response = await fetch(
            `https://api.adzuna.com/v1/api/jobs/us/search/1?` +
            `app_id=${process.env.ADZUNA_APP_ID}&` +
            `app_key=${process.env.ADZUNA_API_KEY}&` +
            `what=${what}&` +
            `where=${where}`
        );

        if (!response.ok) {
            throw new Error(`Adzuna API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

export default router;