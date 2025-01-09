import User from '../models/User.js';
import Assessment from './assessment.js';

export function setupAssociations() {
    Assessment.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Assessment, { foreignKey: 'userId' });
}