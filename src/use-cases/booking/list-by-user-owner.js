export default function makeListByUserOwner({ bookingDb, userDb, carDb }) {
  return async function listByUserOwner({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);

    const bookingRequests = await bookingDb.findByUser(uuid);

    await Promise.all(
      bookingRequests.map(async (request) => {
        const { car_id: carId, user_id: bookingBy } = request;

        const {
          uuid: uid,
          firstName,
          lastName,
          email,
          profilePhoto,
        } = await userDb.findByUUID(bookingBy);
        delete request.user_id;
        request.bookingBy = { uid, firstName, lastName, email, profilePhoto };

        const { car_id: id, name, model, year, images } = await carDb.findCar(
          carId
        );
        delete request.car_id;
        request.bookingCar = {
          carId: id,
          car: `${name} ${model} ${year}`,
          image: images[0].imagePath,
        };
      })
    );

    return bookingRequests;
  };
}
