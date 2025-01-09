import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

interface assessmentAttributes {
    id: string;
    userId: string;
    personalityResults?: Record<string, any>;
    skillsResults?: Record<string, any>;
    careerMatches?: Record<string, any>;
    completedAt?: Date;
}

export class Assessment extends Model<assessmentAttributes> implements assessmentAttributes {
    public id!: string;
    public userId!: string;
    public personalityResults?: Record<string, any>;
    public skillsResults?: Record<string, any>;
    public careerMatches?: Record<string, any>;
    public completedAt?: Date;
}

Assessment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
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
}, {
    sequelize,
    tableName: 'assessments',
    timestamps: true,
    underscored: true,
    modelName: 'Assessment'
});

export default Assessment;