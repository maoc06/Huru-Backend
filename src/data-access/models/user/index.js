import client from '../../client';

import buildUserModel from './user-model';
import buildUserTypeModel from './user-type-model';
import buildUserReviewModel from './user-review-model';

const Type = buildUserTypeModel(client);
const User = buildUserModel(client);
const UserReview = buildUserReviewModel(client);

// Associations start
Type.hasMany(User, { foreignKey: 'userType' });

User.belongsTo(Type, { foreignKey: 'userType' });
User.hasMany(UserReview, { foreignKey: 'addedBy' });
// User.hasMany(UserReview, { foreignKey: 'userId' });

UserReview.belongsTo(User, { as: 'reviewBy', foreignKey: 'addedBy' });
// UserReview.belongsTo(User, { foreignKey: 'userId' });
// Associations end

export default { User, Type, UserReview };

export { buildUserModel as user, buildUserTypeModel as userType };
