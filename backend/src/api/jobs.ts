import express from 'express';

const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const { app_id, app_key, what, where, results_per_page } = req.query;

        // Build the URL with query parameters
        const params = new URLSearchParams({
            app_id: app_id as string,
            app_key: app_key as string,
            what: what as string,
            where: where as string,
            results_per_page: results_per_page as string
        });

        const response = await fetch(
            `https://api.adzuna.com/v1/api/jobs/us/search/1?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

export default router;