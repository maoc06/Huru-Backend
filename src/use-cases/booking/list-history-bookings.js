export default function makeListBookingsHistory({ bookingDb, userDb, carDb }) {
  return async function listBookingsHistory({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);

    const existing = await userDb.findByUUID(uuid);
    if (!existing) throw new Error(`User not found`);

    const bookings = await bookingDb.findBookingsHistory(uuid);

    await Promise.all(
      bookings.map(async ({ dataValues }) => {
        const booking = dataValues;
        const { bookingCar } = booking;

        const car = await carDb.findCar(bookingCar);
        const { car_id: id, name, model, year, images } = car;

        booking.bookingCar = {
          carId: id,
          car: `${name} ${model} ${year}`,
          images,
        };
      })
    );

    return bookings;
  };
}
