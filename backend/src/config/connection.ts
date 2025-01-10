import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    throw new Error('DATABASE_URL is required');
}

export default sequelize;