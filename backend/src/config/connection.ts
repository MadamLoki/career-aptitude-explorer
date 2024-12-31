import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL);
} else {
    const dbName = process.env.DB_NAME as string;
    const dbUser = process.env.DB_USER as string;
    const dbPassword = process.env.DB_PW as string;

    sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: 'localhost',
        dialect: 'postgres',
    });
}

export default sequelize;
