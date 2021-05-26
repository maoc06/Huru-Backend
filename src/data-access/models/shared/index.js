import client from '../../client';

import buildCityModel from './city-model';

const City = buildCityModel(client);

export default { City };
