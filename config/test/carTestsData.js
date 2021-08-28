class CarTestsData {
  constructor() {
    this.alreadyRegisterID = 29;
    this.alreadyRegisterVIN = 'LOP100254KJM78006';
    this.alreadyRegisterOwner = '004f4cca-7461-44a0-b3a3-bbce3c1dcdb2';
    this.alreadyRegisterLicense = 'JUP 336';

    this.testUpdatedDescripcion =
      'This is a test description to check the correct update in the system on a specified vehicle.';
    this.testUpdatedPrice = 89777;
    this.testUpdatedCityId = 5;
    this.testUpdatedAdvanceNoticeId = 4;
    this.testUpdatedFuelId = 3;

    this.car = {
      vin: 'WOLP1003KLP235A54',
      owner: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      licensePlate: 'GTR 478',
      price: 85000,
      year: 2020,
      makerId: 1, // Audi
      modelId: 1, // A3 Sportback
      cityId: 4, // Cali
      fuelId: 2, // Extra
      odometerRangeId: 1, // 0-50k Km
      advanceNoticeId: 3, // 12 horas
      minTripDurationId: 1, // 1 dia
      maxTripDurationId: 4, // 1 mes
    };

    this.carFeatures = {
      carId: this.alreadyRegisterID,
      selected: [
        { carId: this.alreadyRegisterID, featureId: 1 },
        { carId: this.alreadyRegisterID, featureId: 5 },
        { carId: this.alreadyRegisterID, featureId: 8 },
      ],
    };

    this.carNotFeatures = {
      carId: 0,
      selected: [
        { carId: 0, featureId: 1 },
        { carId: 0, featureId: 5 },
        { carId: 0, featureId: 8 },
      ],
    };
  }

  getCar = () => this.car;

  getCarFeatures = () => this.carFeatures;

  getCarNotFeatures = () => this.carNotFeatures;

  getAlreadyTestID = () => this.alreadyRegisterID;

  getAlreadyTestVIN = () => this.alreadyRegisterVIN;

  getAlreadyTestOwner = () => this.alreadyRegisterOwner;

  getAlreadyTestLicense = () => this.alreadyRegisterLicense;

  getTestDescription = () => this.testUpdatedDescripcion;

  getTestPrice = () => this.testUpdatedPrice;

  getTestCity = () => this.testUpdatedCityId;

  getTestAdvanceNotice = () => this.testUpdatedAdvanceNoticeId;

  getTestFuel = () => this.testUpdatedFuelId;

  getCarOwnerNotFound = () => {
    const car = { ...this.car };
    car.owner = '48fea034-d9c1-49f1-bf3c-741bb77d88dd';
    return car;
  };

  getCarWrongVIN = (vinValueTest = 'LOP100254KJM78006') => {
    const car = { ...this.car };
    car.vin = vinValueTest;
    return car;
  };

  getCarOdometerOutOfRange = () => {
    const car = { ...this.car };
    car.odometerRangeId = 4; // 130k+ Km
    return car;
  };

  getCarTooOld = () => {
    const car = { ...this.car };
    car.year = 1990;
    return car;
  };

  getCarLicensePlateAlreadyExits = () => {
    const car = { ...this.car };
    car.licensePlate = 'JUP 336';
    return car;
  };

  getCarPriceRangeOut = (priceValueTest = 25000) => {
    const car = { ...this.car };
    car.price = priceValueTest;
    return car;
  };
}

module.exports = { CarTestsData };
