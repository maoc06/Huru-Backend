import { carBasicSettingsUseCases } from '../../use-cases';

import makeGetModels from './get-models';
import makeGetCarModelsByMaker from './get-car-models-by-makers';
import makeGetCarCategories from './get-car-categories';
import makeGetOdometer from './get-odometer';
import makeGetTrasmission from './get-transmission';
import makeGetAdvanceNotice from './get-advance-notice';
import makeGetMinTrip from './get-min-trip';
import makeGetMaxTrip from './get-max-trip';
import makeGetFeaturesOpts from './get-features-options';
import makeGetFuel from './get-fuel';
import makePostCarFeatures from './post-car-features';
import makePostCarImage from './post-car-image';
import makePutOwnerCarImage from './put-owner-car-image';
import makeDeleteCarImage from './delete-car-image';

const {
  listModels,
  listCarModelsByMaker,
  listCarCategories,
  listOdometer,
  listTransmissions,
  listAdvanceNotice,
  listMinTrip,
  listMaxTrip,
  listFeaturesOpts,
  listFuel,
  addCarFeatures,
  addCarImage,
  updateOwnerCarImage,
  removeCarImage,
} = carBasicSettingsUseCases;

const getModels = makeGetModels({ listModels });
const getCarModelsByMaker = makeGetCarModelsByMaker({ listCarModelsByMaker });
const getCarCategories = makeGetCarCategories({ listCarCategories });
const getOdometer = makeGetOdometer({ listOdometer });
const getTrasmission = makeGetTrasmission({ listTransmissions });
const getAdvanceNotice = makeGetAdvanceNotice({ listAdvanceNotice });
const getMinTrip = makeGetMinTrip({ listMinTrip });
const getMaxTrip = makeGetMaxTrip({ listMaxTrip });
const getFuel = makeGetFuel({ listFuel });
const getFeaturesOpts = makeGetFeaturesOpts({ listFeaturesOpts });
const postCarFeatures = makePostCarFeatures({ addCarFeatures });
const postCarImage = makePostCarImage({ addCarImage });
const putOwnerCarImage = makePutOwnerCarImage({ updateOwnerCarImage });
const deleteCarImage = makeDeleteCarImage({ removeCarImage });

export default {
  getModels,
  getCarModelsByMaker,
  getCarCategories,
  getOdometer,
  getTrasmission,
  getAdvanceNotice,
  getMinTrip,
  getMaxTrip,
  getFeaturesOpts,
  getFuel,
  postCarFeatures,
  postCarImage,
  putOwnerCarImage,
  deleteCarImage,
};
