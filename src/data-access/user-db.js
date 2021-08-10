import { Op } from 'sequelize';
import { UserModels } from './models';
import { uploadFileS3 } from '../utils/actions-s3';

const { User, UserReview } = UserModels;

export default function makeUserDb() {
  function findByUUID(userId) {
    return User.findOne({
      where: { uuid: userId },
      // attributes: { exclude: ['password'] },
    });
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

  async function insertProfileImage(imageInfo) {
    const { photoFile } = imageInfo;

    const s3 = await uploadFileS3(photoFile, 'users');
    if (!s3.success) throw new Error('Error uploading the profile user image');

    return s3.url;
  }

  function queryUser(query) {
    return User.findAll({
      attributes: { exclude: ['password'] },
      where: {
        [Op.or]: [
          {
            firstName: { [Op.substring]: query },
          },
          {
            lastName: { [Op.substring]: query },
          },
        ],
      },
    });
  }

  return Object.freeze({
    findByUUID,
    findByEmail,
    findUserReviews,
    findUserReviewsByBooking,
    updateProfile,
    updateEmailVerification,
    insertReview,
    insertProfileImage,
    queryUser,
  });
}
