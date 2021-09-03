Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeAddUserReview;

const _entities = require('../../entities');

function makeAddUserReview({ userDb }) {
  return async function addUserReview(reviewInfo) {
    const review = (0, _entities.makeUserReview)(reviewInfo);
    return userDb.insertReview(review);
  };
}
