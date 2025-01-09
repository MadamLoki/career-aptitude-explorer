import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const CareerTest = sequelize.define('CareerTest', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    questions: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});