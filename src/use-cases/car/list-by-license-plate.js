export default function makeListByLicensePlate({ carDb }) {
  return async function listByLicensePlate({ license } = {}) {
    if (!license) throw new Error('license plate null');

    const existing = await carDb.findByLicensePlate(license);
    // if (existing.length === 0) throw new Error('Car not found');
    if (existing.length === 0) return {};

    return existing;
  };
}
