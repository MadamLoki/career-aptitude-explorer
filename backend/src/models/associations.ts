import User from '../models/User.js';
import Assessment from './assessment.js';
import Job from './Job.js';

User.hasMany(Job, { foreignKey: 'userId' });  // A user can have many jobs
Job.belongsTo(User, { foreignKey: 'userId' });  // A job belongs to a user

export function setupAssociations() {
    Assessment.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Assessment, { foreignKey: 'userId' });
}