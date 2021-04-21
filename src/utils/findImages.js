export default function findImages({
  arr,
  funcSeeker,
  attr = 'car_id',
  isMultiple = false,
}) {
  return Promise.all(
    arr.map(async (item) => {
      let data = item;
      const images = await funcSeeker(data[attr], isMultiple);

      if (data.dataValues) {
        data = data.dataValues;
      }

      if (images === null) {
        data.image = '';
        return data;
      }

      if (isMultiple) {
        data.images = images;
        return data;
      }

      data.image = images.imagePath;
      return data;
    })
  );
}
