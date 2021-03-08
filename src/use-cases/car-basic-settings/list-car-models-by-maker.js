export default function makeListCarModelsByMaker({
  carBasicSettingsDb,
  makerDb,
}) {
  return async function listCarModelsByMaker({ makerId } = {}) {
    if (!makerId) throw new Error(`Maker id null`);

    const maker = await makerDb.findById(makerId);
    if (!maker) throw new Error(`Maker with id ${makerId} not found`);

    const models = await carBasicSettingsDb.findModelsByMaker(makerId);
    if (!models)
      throw new Error(`No models found for maker with id ${makerId}`);

    return models;
  };
}
