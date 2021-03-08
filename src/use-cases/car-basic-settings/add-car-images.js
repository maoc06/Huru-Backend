export default function makeAddCarImage({ carBasicSettingsDb, carDb, userDb }) {
  return async function addCarImage(imageInfo) {
    await validate(imageInfo);

    return carBasicSettingsDb.insertCarImage(imageInfo);
  };

  async function validate(imageInfo) {
    const { carId, addedBy } = imageInfo;

    // Verificar que el Carro exista
    let existing = await carDb.findById(carId);
    if (!existing) throw new Error(`car-not-found`);

    // Verificar que el usuario exista
    existing = await userDb.findByUUID(addedBy);
    if (!existing) throw new Error(`user-not-found`);
  }
}
