import { Request, Response } from 'express';
import Job from '../models/Job.js';
import { Op } from 'sequelize';

export const getJobs = async (req: Request, res: Response) => {
    const title = req.query.title as string;
    // Check if the title parameter is missing or invalid
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing title parameter' });
    }
    // Query the database for jobs matching the title
    try { 
        const jobs = await Job.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            },
            order: [['created', 'DESC']],
            limit: 20
        });

        res.json(jobs);
    } catch (error) {
        // console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(200).end();
};