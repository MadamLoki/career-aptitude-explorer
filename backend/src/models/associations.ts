import User from './User.js';
import Assessment from './Assessment.js';

export function setupAssociations() {
    Assessment.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(Assessment, { foreignKey: 'userId' });
}