import { carBasicSettingsUseCases } from '../../use-cases';

import makeGetModels from './get-models';
import makeGetCarModelsByMaker from './get-car-models-by-makers';
import makeGetOdometer from './get-odometer';
import makeGetTrasmission from './get-transmission';
import makeGetAdvanceNotice from './get-advance-notice';
import makeGetMinTrip from './get-min-trip';
import makeGetMaxTrip from './get-max-trip';
import makeGetFeaturesOpts from './get-features-options';
import makePostCarFeatures from './post-car-features';
import makePostCarImage from './post-car-image';

const {
  listModels,
  listCarModelsByMaker,
  listOdometer,
  listTransmissions,
  listAdvanceNotice,
  listMinTrip,
  listMaxTrip,
  listFeaturesOpts,
  addCarFeatures,
  addCarImage,
} = carBasicSettingsUseCases;

const getModels = makeGetModels({ listModels });
const getCarModelsByMaker = makeGetCarModelsByMaker({ listCarModelsByMaker });
const getOdometer = makeGetOdometer({ listOdometer });
const getTrasmission = makeGetTrasmission({ listTransmissions });
const getAdvanceNotice = makeGetAdvanceNotice({ listAdvanceNotice });
const getMinTrip = makeGetMinTrip({ listMinTrip });
const getMaxTrip = makeGetMaxTrip({ listMaxTrip });
const getFeaturesOpts = makeGetFeaturesOpts({ listFeaturesOpts });
const postCarFeatures = makePostCarFeatures({ addCarFeatures });
const postCarImage = makePostCarImage({ addCarImage });

export default {
  getModels,
  getCarModelsByMaker,
  getOdometer,
  getTrasmission,
  getAdvanceNotice,
  getMinTrip,
  getMaxTrip,
  getFeaturesOpts,
  postCarFeatures,
  postCarImage,
};
