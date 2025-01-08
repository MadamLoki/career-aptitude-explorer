import { Router, Request, Response } from 'express';
const router = Router();

router.get('/search', async (req: Request, res: Response) => {
    try {
        const { what, where } = req.query;
        
        // Log environment variables to debug
        console.log('Using Adzuna credentials:', {
            appId: process.env.ADZUNA_APP_ID ? 'Set' : 'Not set',
            appKey: process.env.ADZUNA_API_KEY ? 'Set' : 'Not set'
        });

        // Create URL parameters
        const params = new URLSearchParams({
            app_id: process.env.ADZUNA_APP_ID || '',
            app_key: process.env.ADZUNA_API_KEY || '',
            what: (what as string) || '',
            where: (where as string) || '',
            results_per_page: '10'
        });

        // Make request to Adzuna
        const response = await fetch(
            `https://api.adzuna.com/v1/api/jobs/us/search/1?${params.toString()}`
        );

        // If Adzuna request fails
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Adzuna API error:', errorText);
            throw new Error('Failed to fetch from Adzuna API');
        }

        // Send successful response
        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Job search error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch jobs',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;