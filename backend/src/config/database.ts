// src/config/database.ts
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set in the environment variables');
}

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // This is required for Render's PostgreSQL
        }
    },
    pool: {
        max: 5, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // Maximum time (ms) that pool will try to get connection before throwing error
        idle: 10000 // Maximum time (ms) that a connection can be idle before being released
    }
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✓ Database connection established successfully.');
        
        // Sync models - be careful with force: true in production!
        await sequelize.sync({ force: false, alter: true });
        console.log('✓ Database models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export { connectToDatabase };
export default sequelize;