-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS careers;
DROP TABLE IF EXISTS user_career_preferences;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create careers table
CREATE TABLE careers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_career_preferences table
CREATE TABLE user_career_preferences (
    user_id INT,
    career_id INT,
    preference_level INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, career_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (career_id) REFERENCES careers(id)
);

-- Insert sample data into users table
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_smith', 'jane@example.com', 'password456');

-- Insert sample data into careers table
INSERT INTO careers (name, description) VALUES
('Software Engineer', 'Develops and maintains software applications.'),
('Data Scientist', 'Analyzes and interprets complex data to help companies make decisions.');

-- Insert sample data into user_career_preferences table
INSERT INTO user_career_preferences (user_id, career_id, preference_level) VALUES
(1, 1, 5),
(1, 2, 3),
(2, 1, 4),
(2, 2, 5);