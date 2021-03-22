export default function makeListCarsByCity({ carDb }) {
  return async function listCarsByCity({ city, checkIn, checkOut } = {}) {
    if (!city) throw new Error('city null');

    const existing = await carDb.findCarsByCity(city, checkIn, checkOut);
    if (existing.length === 0) return {};

    return existing;
  };
}
