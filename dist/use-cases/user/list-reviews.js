Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListReviews;

function makeListReviews({ userDb }) {
  return async function listReviews({ userId } = {}) {
    if (!userId) throw new Error('user id null');
    const existing = await userDb.findByUUID(userId);

    if (!existing) {
      throw new Error(`The user with id ${userId} does not exits`);
    }

    const reviews = await userDb.findUserReviews(userId);
    return reviews;
  };
}
