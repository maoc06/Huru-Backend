export default function makeCountCompletedTrips({ bookingDb, userDb }) {
  return async function countCompletedTrips({ userId } = {}) {
    if (!userId) throw new Error(`User id null`);

    const existing = await userDb.findByUUID(userId);
    if (!existing) throw new RangeError(`User with id ${userId} not found`);

    const count = await bookingDb.countCompletedTrips(userId);

    return count;
  };
}
