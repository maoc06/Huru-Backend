import makeListMakers from './list-makers';

import { makerDb } from '../../data-access';

const listMakers = makeListMakers({ makerDb });

export default {
  listMakers,
};
