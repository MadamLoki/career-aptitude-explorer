import { Router } from 'express';
const router = Router();

router.get('/search', async (req, res) => {
    try {
        const { what, where } = req.query;
        
        if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_API_KEY) {
            throw new Error('Missing Adzuna API credentials');
        }

        const apiUrl = new URL('https://api.adzuna.com/v1/api/jobs/us/search/1');
        apiUrl.searchParams.append('app_id', process.env.ADZUNA_APP_ID);
        apiUrl.searchParams.append('app_key', process.env.ADZUNA_API_KEY);
        apiUrl.searchParams.append('what', what as string);
        apiUrl.searchParams.append('where', where as string);
        apiUrl.searchParams.append('content-type', 'application/json');

        console.log('Fetching from Adzuna:', apiUrl.toString());

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Adzuna API error:', errorText);
            throw new Error(`Adzuna API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ 
            error: 'Failed to fetch jobs',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;