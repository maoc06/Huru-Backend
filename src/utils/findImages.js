/* eslint-disable no-param-reassign */
export default function findImages(arr, funcSeeker, isMultiple) {
  return Promise.all(
    arr.map(async (item) => {
      const images = await funcSeeker(item.car_id, isMultiple);

      if (isMultiple) {
        item.images = images;
        return item;
      }
      if (images === null) {
        item.image = '';
        return item;
      }

      item.image = images.imagePath;
      return item;
    })
  );
}
