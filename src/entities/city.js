export default function buildMakeCity() {
  return function makeCity({ cityId, name } = {}) {
    if (!name) {
      throw new Error('City must have a name');
    }

    return Object.freeze({
      getCityId: () => cityId,
      getCityName: () => name,
    });
  };
}
