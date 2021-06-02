/* eslint-disable no-param-reassign */
export default function findFeatures({
  arr,
  funcSeeker,
  propName,
  propKey = 'car_id',
}) {
  return Promise.all(
    arr.map(async (item) => {
      const features = await funcSeeker(item[propKey]);
      item[propName] = features;
      return item;
    })
  );
}
