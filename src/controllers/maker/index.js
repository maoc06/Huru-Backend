import { makerUseCases } from '../../use-cases';

import makeGetMakers from './get-makers';

const { listMakers } = makerUseCases;

const getMakers = makeGetMakers({ listMakers });

export default {
  getMakers,
};
