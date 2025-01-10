import { Pool } from 'pg';
import axios from 'axios';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';


dotenv.config();

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.ADZUNA_DB_URL,
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Adzuna API credentials
const ADZUNA_APP_ID = process.env.ADZUNA_API_APP_ID!;
const ADZUNA_APP_KEY = process.env.ADZUNA_API_APP_KEY!;
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY!;
const API_URL = `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}/search/1`;

// Function to fetch data from Adzuna API
const fetchJobsFromAdzuna = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_APP_KEY,
        results_per_page: 20,
      },
    });

    const jobs = response.data.results;
    console.log(`Fetched ${jobs.length} jobs.`);
    return jobs;
  } catch (error) {
    console.error('Error fetching data from Adzuna:', error);
    throw error;
  }
};

// Function to insert jobs into the database
const insertJobsIntoDB = async (jobs: any[]) => {
  const client = await pool.connect();

  try {
    for (const job of jobs) {
      // Insert job into the Jobs table
      await client.query(
        `
          INSERT INTO Jobs (
            job_id, title, description, company_name, location_name,
            latitude, longitude, salary_min, salary_max, salary_is_predicted,
            category_label, contract_type, contract_time, created, redirect_url
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (job_id) DO NOTHING
        `,
        [
          job.id,
          job.title,
          job.description,
          job.company?.display_name,
          job.location?.display_name,
          job.latitude,
          job.longitude,
          job.salary_min,
          job.salary_max,
          job.salary_is_predicted === '1',
          job.category?.label,
          job.contract_type,
          job.contract_time,
          job.created,
          job.redirect_url,
        ]
      );

      // Insert location data into the Job_Locations table
      if (job.location?.area) {
        for (const area of job.location.area) {
          await client.query(
            `
              INSERT INTO Job_Locations (job_id, location_area)
              VALUES ($1, $2)
              ON CONFLICT DO NOTHING
            `,
            [job.id, area]
          );
        }
      }
    }
    console.log('Jobs inserted into the database successfully.');
  } catch (error) {
    console.error('Error inserting jobs into the database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Main function to fetch and store jobs
const main = async () => {
  try {
    const jobs = await fetchJobsFromAdzuna();
    await insertJobsIntoDB(jobs);
  } catch (error) {
    console.error('Error in main process:', error);
  } finally {
    await pool.end();
  }
};

main();
// Search jobs by title endpoint
app.get('/api/jobs', async (_req: Request, res: Response) => {
    const {title} = _req.query;

    if(!title || typeof title !== 'string'){
        return res.status(400).json({message: 'Invalid title'});
    }

    try {
        // Query the database for matching job titles
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
        return res.json(result.rows);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});