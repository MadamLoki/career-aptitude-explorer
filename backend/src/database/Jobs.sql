CREATE TABLE IF NOT EXISTS Jobs (
    job_id VARCHAR(255) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    company_name VARCHAR(255),
    location_name VARCHAR(255),
    latitude DECIMAL,
    longitude DECIMAL,
    salary_min DECIMAL,
    salary_max DECIMAL,
    salary_is_predicted BOOLEAN,
    category_label VARCHAR(255),
    contract_type VARCHAR(50),
    contract_time VARCHAR(50),
    created TIMESTAMP,
    redirect_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Job_Locations (
    job_id VARCHAR(255),
    location_area VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (job_id, location_area),
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id) ON DELETE CASCADE
);

CREATE INDEX idx_jobs_title ON Jobs(title);
CREATE INDEX idx_jobs_created ON Jobs(created);
CREATE INDEX idx_job_locations_area ON Job_Locations(location_area);