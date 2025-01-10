// src/api/jobs.ts
import { Router } from 'express';
import axios from 'axios';
import { Request, Response } from 'express';

const router = Router();

// Search jobs endpoint
router.get('/search', async (req: Request, res: Response): Promise<Response | void> => {
  try {
      const { what, where } = req.query;
      
      // Basic input validation
      if (!what && !where) {
          return res.status(400).json({ 
              error: 'At least one search parameter (what/where) is required' 
          });
      }

      // Make request to Adzuna API
      const response = await axios.get(
          `https://api.adzuna.com/v1/api/jobs/us/search/1`,
          {
              params: {
                  app_id: process.env.ADZUNA_APP_ID,
                  app_key: process.env.ADZUNA_API_KEY,
                  results_per_page: '10',
                  ...(what && { what: what.toString() }),
                  ...(where && { where: where.toString() })
              }
          }
      );

      // Send response data back to client
      return res.json(response.data);

  } catch (error) {
      console.error('Job search error:', error);
      
      if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
              return res.status(429).json({ 
                  error: 'Rate limit exceeded. Please try again later.' 
              });
          }
          if (error.response?.status === 401) {
              return res.status(401).json({ 
                  error: 'API authentication failed' 
              });
          }
          return res.status(error.response?.status || 500).json({ 
              error: error.response?.data?.error || 'Failed to fetch jobs' 
          });
      }

      return res.status(500).json({ 
          error: 'An unexpected error occurred while searching for jobs' 
      });
  }
});

export default router;