import { UserModels } from './models';

const { User, UserReview } = UserModels;

export default function makeUserDb() {
  function findByUUID(userId) {
    return User.findByPk(userId);
  }

  async function findByEmail(email) {
    const res = await User.findAll({ attributes: ['email'], where: { email } });

    if (res.length === 0) return {};

    return res[0].dataValues;
  }

  function findUserReviews(userId) {
    return UserReview.findAll({
      attributes: { exclude: ['addedBy'] },
      where: { userId },
      include: {
        model: User,
        as: 'reviewBy',
        attributes: ['uuid', 'firstName', 'lastName', 'profilePhoto'],
      },
    });
  }

  function findUserReviewsByBooking(bookingId) {
    return UserReview.findOne({ where: { bookingId } });
  }

  function updateProfile(profileData) {
    const { uuid } = profileData;

    return User.update(profileData, {
      where: { uuid },
    });
  }

  function updateEmailVerification(email, verification) {
    User.update({ isEmailVerified: verification }, { where: { email } });
  }

  function insertReview(review) {
    return UserReview.create(review);
  }

  return Object.freeze({
    findByUUID,
    findByEmail,
    findUserReviews,
    findUserReviewsByBooking,
    updateProfile,
    updateEmailVerification,
    insertReview,
  });
}
