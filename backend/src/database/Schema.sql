DROP DATABASE IF EXISTS job_board;
CREATE DATABASE job_board;

USE job_board;

-- Table to store user login information
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,          -- Unique identifier for each user
    username VARCHAR(100) UNIQUE NOT NULL, -- Username for login
    email VARCHAR(255) UNIQUE NOT NULL,  -- User's email
    password_hash TEXT NOT NULL,         -- Password (hashed for security)
    created_at TIMESTAMP DEFAULT NOW()   -- Account creation timestamp
);

-- Table to store user-specific results (linked to Adzuna jobs)
CREATE TABLE User_Results (
    result_id SERIAL PRIMARY KEY,        -- Unique identifier for each result entry
    user_id INT NOT NULL,                -- Foreign key linking to Users table
    job_id VARCHAR(50) NOT NULL,         -- Foreign key linking to Jobs table
    suitability_score DECIMAL(5, 2),     -- User's suitability score for the job
    viewed BOOLEAN DEFAULT FALSE,        -- Whether the user has viewed the job
    applied BOOLEAN DEFAULT FALSE,       -- Whether the user has applied for the job
    created_at TIMESTAMP DEFAULT NOW(),  -- Timestamp when the result was stored
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id) ON DELETE CASCADE
);

-- Modified Jobs table remains the same
CREATE TABLE Jobs (
    job_id VARCHAR(50) PRIMARY KEY,      -- Unique identifier for each job listing
    title VARCHAR(255),                  -- Job title
    description TEXT,                    -- Job description
    company_name VARCHAR(255),           -- Name of the hiring company
    location_name VARCHAR(255),          -- Display name of the job location
    latitude DECIMAL(10, 7),             -- Latitude of the job location
    longitude DECIMAL(10, 7),            -- Longitude of the job location
    salary_min DECIMAL(10, 2),           -- Minimum salary
    salary_max DECIMAL(10, 2),           -- Maximum salary
    salary_is_predicted BOOLEAN,         -- Indicates if the salary is estimated
    category_label VARCHAR(255),         -- Job category name
    contract_type VARCHAR(50),           -- Contract type (e.g., permanent, contract)
    contract_time VARCHAR(50),           -- Contract time (e.g., full-time, part-time)
    created TIMESTAMP,                   -- Job creation date and time
    redirect_url TEXT                    -- URL to the full job listing
);

-- Modified Job_Locations table remains the same
CREATE TABLE Job_Locations (
    location_id SERIAL PRIMARY KEY,      -- Unique identifier for each location
    job_id VARCHAR(50),                 -- Foreign key linking to Jobs table
    location_area VARCHAR(255),         -- Location area (country, region, city)
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);

-- Modified Job_Categories table remains the same
CREATE TABLE Job_Categories (
    category_id SERIAL PRIMARY KEY,      -- Unique identifier for each category
    label VARCHAR(255),                 -- Category label
    tag VARCHAR(50)                     -- Category tag
);
