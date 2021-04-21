import makeListModels from './list-models';
import makeListCarCategories from './list-car-categories';
import makeListCarModelsByMaker from './list-car-models-by-maker';
import makeListOdometer from './list-odometers';
import makeListTransmissions from './list-transmissions';
import makeListAdvanceNotice from './list-advance-notice';
import makeListMinTrip from './list-min-trip';
import makeListMaxTrip from './list-max-trip';
import makeListFeaturesOpts from './list-features-options';
import makeAddCarFeatures from './add-car-features';
import makeAddCarImage from './add-car-images';
import makeUpdateOwnerCarImage from './update-owner-car-image';
import makeRemoveCarImage from './remove-car-image';

import { carBasicSettingsDb, makerDb, carDb, userDb } from '../../data-access';

const listModels = makeListModels({ carBasicSettingsDb });
const listCarModelsByMaker = makeListCarModelsByMaker({
  carBasicSettingsDb,
  makerDb,
});
const listCarCategories = makeListCarCategories({ carBasicSettingsDb });
const listOdometer = makeListOdometer({ carBasicSettingsDb });
const listTransmissions = makeListTransmissions({ carBasicSettingsDb });
const listAdvanceNotice = makeListAdvanceNotice({ carBasicSettingsDb });
const listMinTrip = makeListMinTrip({ carBasicSettingsDb });
const listMaxTrip = makeListMaxTrip({ carBasicSettingsDb });
const listFeaturesOpts = makeListFeaturesOpts({ carBasicSettingsDb });
const addCarFeatures = makeAddCarFeatures({ carBasicSettingsDb, carDb });
const addCarImage = makeAddCarImage({ carBasicSettingsDb, userDb });
const updateOwnerCarImage = makeUpdateOwnerCarImage({ carBasicSettingsDb });
const removeCarImage = makeRemoveCarImage({ carBasicSettingsDb });

export default {
  listModels,
  listCarModelsByMaker,
  listCarCategories,
  listOdometer,
  listTransmissions,
  listAdvanceNotice,
  listMinTrip,
  listMaxTrip,
  listFeaturesOpts,
  addCarFeatures,
  addCarImage,
  updateOwnerCarImage,
  removeCarImage,
};
