import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import User from '../models/User.js';

export const assessment = sequelize.define('assessment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    personalityResults: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    skillsResults: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    careerMatches: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

assessment.belongsTo(User);
User.hasMany(assessment);