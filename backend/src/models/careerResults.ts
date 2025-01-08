import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from '../middleware/user';

export const CareerResults = sequelize.define('CareerResults', {
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
    careerTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    matchPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    skillsMatch: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    recommendedPath: {
        type: DataTypes.JSONB,
        allowNull: false
    }
});

CareerResults.belongsTo(User);
User.hasMany(CareerResults);