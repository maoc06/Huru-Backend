/* eslint-disable no-param-reassign */
export default function findFeatures(arr, funcSeeker) {
  return Promise.all(
    arr.map(async (item) => {
      const features = await funcSeeker(item.car_id);
      item.features = features;
      return item;
    })
  );
}
