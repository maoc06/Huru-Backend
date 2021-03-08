import buildUserModel from './models/user/user-model';

export default function makeUserDb({ client }) {
  const user = buildUserModel({ client });

  function findByUUID(userId) {
    return user.findByPk(userId);
  }

  async function findByEmail(email) {
    const res = await user.findAll({ attributes: ['email'], where: { email } });

    if (res.length === 0) return {};

    return res[0].dataValues;
  }

  return Object.freeze({
    findByUUID,
    findByEmail,
  });
}
