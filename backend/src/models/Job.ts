import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        company_name: DataTypes.STRING,
        location_name: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        salary_min: DataTypes.FLOAT,
        salary_max: DataTypes.FLOAT,
        salary_is_predicted: DataTypes.BOOLEAN,
        category_label: DataTypes.STRING,
        contract_type: DataTypes.STRING,
        contract_time: DataTypes.STRING,
        created: DataTypes.DATE,
        redirect_url: DataTypes.STRING,
    },
    { sequelize, modelName: 'job' }
);

export default Job;