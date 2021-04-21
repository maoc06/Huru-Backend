export default function makeListByUserOwner({ bookingDb }) {
  return async function listByUserOwner({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);

    const bookingRequests = await bookingDb.findByUser(uuid);
    return bookingRequests;
  };
}
