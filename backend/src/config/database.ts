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
    ssl: process.env.NODE_ENV === 'production',
    dialectOptions: process.env.NODE_ENV === 'production' ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {}
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

export { connectToDatabase };
export default sequelize;