import buildUserModel from './models/user/user-model';

export default function makeAuthDb({ client }) {
  const user = buildUserModel({ client });

  async function insert({ ...userInfo }) {
    const res = await user.create(
      { ...userInfo },
      {
        fields: [
          'firstName',
          'lastName',
          'email',
          'password',
          'phone',
          'identityDocument',
          'dateOfBirth',
          'isPhoneVerified',
        ],
      }
    );

    delete res.dataValues.password;

    return res;
  }

  async function findByEmail(email) {
    const res = await user.findAll({ attributes: ['email'], where: { email } });

    if (res.length === 0) return {};

    return res[0].dataValues;
  }

  function getInfoUser(email) {
    return user.findAll({ where: { email } });
  }

  async function findByPhone(phone) {
    const res = await user.findAll({ attributes: ['phone'], where: { phone } });

    if (res.length === 0) return {};

    return res[0].dataValues;
  }

  async function findByDocumetID(identityDocument) {
    const res = await user.findAll({
      attributes: ['document_id'],
      where: { identityDocument },
    });

    if (res.length === 0) return {};

    return res[0].dataValues;
  }

  return Object.freeze({
    insert,
    findByEmail,
    findByPhone,
    findByDocumetID,
    getInfoUser,
  });
}
