const { getOperationDate } = require('./datesTestData.js');

class SearchTestsData {
  constructor() {
    this.queryParams = {
      city: 'cali',
      checkIn: getOperationDate({ date: new Date(), days: 2 }),
      checkOut: getOperationDate({ date: new Date(), days: 4 }),
    };
  }

  getQueryCity = () => this.queryParams.city;

  getQueryIn = () => this.queryParams.checkIn;

  getQueryOut = () => this.queryParams.checkOut;

  getQueryCartagena = () => 'cartagena';

  getQueryBarranquilla = () => 'BARRANQUILLA';

  getQueryMedellin = () => 'MEDELLÍN';

  getQueryManizales = () => 'Manizales';

  getQueryPereira = () => 'PeReIrA';

  getQueryPasto = () => 'PASTO';
}

module.exports = { SearchTestsData };
