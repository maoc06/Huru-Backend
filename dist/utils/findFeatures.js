Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = findFeatures;

/* eslint-disable no-param-reassign */
function findFeatures({ arr, funcSeeker, propName, propKey = 'car_id' }) {
  return Promise.all(
    arr.map(async (item) => {
      const features = await funcSeeker(item[propKey]);
      item[propName] = features;
      return item;
    })
  );
}
