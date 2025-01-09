import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import User from '../models/User';

export const Assessment = sequelize.define('Assessment', {
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

Assessment.belongsTo(User);
User.hasMany(Assessment);