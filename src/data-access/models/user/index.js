import client from '../../client';

import buildUserModel from './user-model';
import buildUserTypeModel from './user-type-model';

const User = buildUserModel(client);
const Type = buildUserTypeModel(client);

export default { User, Type };

export { buildUserModel as user, buildUserTypeModel as userType };
