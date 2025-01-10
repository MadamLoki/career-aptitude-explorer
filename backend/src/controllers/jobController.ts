import { Request, Response } from 'express';
import { Pool } from 'pg';

// PostgreSQL pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get jobs by title
export const getJobs = async (req: Request, res: Response) => {
    const { title } = req.query;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing title parameter' });
    }

    try {
        // Query the database for jobs matching the title
        const result = await pool.query(
            `
            SELECT 
                job_id, title, description, company_name, location_name,
                latitude, longitude, salary_min, salary_max, salary_is_predicted,
                category_label, contract_type, contract_time, created, redirect_url
            FROM Jobs
            WHERE title ILIKE $1
            ORDER BY created DESC
            LIMIT 50;
            `,
            [`%${title}%`]
        );

        // Return the results
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).end();
};
