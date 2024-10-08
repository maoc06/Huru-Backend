export default function makeListByUserOwner({ carDb, userDb }) {
  return async function listByUserOwner({ ownerUUID } = {}) {
    if (!ownerUUID) throw new Error('owner uuid null');

    const existing = await userDb.findByUUID(ownerUUID);
    if (!existing) throw new Error('Owner uuid not found');

    const cars = await carDb.findByOwner(ownerUUID);

    return cars;
  };
}
