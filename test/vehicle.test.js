const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { CarTestsData } = require('../config/test/carTestsData');
const {
  loginWithTestUser,
  notValidAccessToken,
  removeRegistrationTestCar,
} = require('./commom.test');

chai.should();
chai.use(chaiHttp);

const testCar = new CarTestsData();
let accessToken = '';
let registerCarId = -1;

describe('Vehicles', () => {
  before(async () => {
    const res = await loginWithTestUser();
    accessToken = res.body.token;
  });

  after(() =>
    removeRegistrationTestCar({ accessToken, carId: registerCarId.data.carId })
  );

  describe('Car Registration', () => {
    it('it should NOT POST a car because user owner cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarOwnerNotFound())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('car/owner-uuid-not-found');
          done();
        });
    });

    it('it should NOT POST a car because vin already exists', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarWrongVIN())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('car/vin-already-exists');
          done();
        });
    });

    it('it should NOT POST a car because vin is not in the expected length range (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarWrongVIN('LOP47'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car VIN must have 17 characters');
          done();
        });
    });

    it('it should NOT POST a car because vin is not in the expected length range (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarWrongVIN('LOP100254KJM78006GFRR78'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car VIN must have 17 characters');
          done();
        });
    });

    it('it should NOT POST a car because odometer range it is greater that allowed', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarOdometerOutOfRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Maximum mileage of 130k Km');
          done();
        });
    });

    it('it should NOT POST a car because it is too old', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarTooOld())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car cannot be more than 11 years seniority');
          done();
        });
    });

    it('it should NOT POST a car because license plate already exists', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarLicensePlateAlreadyExits())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('car/license-plate-already-exists');
          done();
        });
    });

    it('it should NOT POST a car because the price is not in the allowed range (too low)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarPriceRangeOut())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car must have a price between $50,000 - $1,000,000 COP');
          done();
        });
    });

    it('it should NOT POST a car because the price is not in the allowed range (too high)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarPriceRangeOut(1250000))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car must have a price between $50,000 - $1,000,000 COP');
          done();
        });
    });

    it('it should NOT POST a car because request not set Authorization header', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .send(testCar.getCar())
        .end((_, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should NOT POST a car because Authorization header set a not valid or expired token', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${notValidAccessToken}` })
        .send(testCar.getCar())
        .end((_, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('it should NOT POST an initial car features because car cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-basics/set-car-features')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarNotFeatures())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('car-not-found');
          done();
        });
    });

    it('it should POST a car', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCar())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Car successfully added');
          res.body.should.have.property('data').to.be.a('object');
          registerCarId = res.body;
          done();
        });
    });

    it('it should POST an initial car features', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-basics/set-car-features')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testCar.getCarFeatures())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Car features successfully added');
          res.body.should.have.property('data').to.be.a('array').to.not.be
            .empty;
          done();
        });
    });
  });

  describe('Car Management', () => {
    it('it should NOT PUT a new car features because car cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 0, features: [1, 3, 5] })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Car not found');
          done();
        });
    });

    it('it should NOT PUT a new car features because features not exists', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID(), features: [100, 260, 589] })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PUT a new car features because car id is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 'carId', features: [1, 5, 10] })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PUT a new car features because features is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          features: ['feat10', '5', 'feat589'],
        })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PATCH car visibility because car cannot found', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/visibility`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 0 })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Car with id 0 not found');
          done();
        });
    });

    it('it should NOT PATCH car visibility because car id is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/visibility`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 'car25' })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PATCH car visibility because car id is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/visibility`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: false })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PATCH car disable because car cannot found', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/disable`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 0 })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Car with id 0 not found');
          done();
        });
    });

    it('it should NOT PATCH car disable because car id is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/disable`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: 'car25' })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT PATCH car disable because car id is not the expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/disable`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: false })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should PUT a new car features', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID(), features: [1, 3, 5] })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update car features successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should PUT a empty car features', (done) => {
      chai
        .request(config.apiUrl)
        .put(`/car/features`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID(), features: [] })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update car features successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('array').to.be.empty;
          done();
        });
    });

    it('it should PATCH car visibility (toogle)', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/visibility`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID() })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update visibility car successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should PATCH car disable (toogle)', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/disable`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID() })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update disabled car successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should PATCH car booking terms: description', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          description: testCar.getTestDescription(),
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('description', testCar.getTestDescription());
          done();
        });
    });

    it('it should PATCH car booking terms: price', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          price: testCar.getTestPrice(),
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('price', testCar.getTestPrice());
          done();
        });
    });

    it('it should PATCH car booking terms: city', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          cityId: testCar.getTestCity(),
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('cityId', testCar.getTestCity());
          done();
        });
    });

    it('it should PATCH car booking terms: fuel', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          fuelId: testCar.getTestFuel(),
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('fuelId', testCar.getTestFuel());
          done();
        });
    });

    it('it should PATCH car booking terms: advance notice', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          carId: testCar.getAlreadyTestID(),
          advanceNoticeId: testCar.getTestAdvanceNotice(),
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property(
              'advanceNoticeId',
              testCar.getTestAdvanceNotice()
            );
          done();
        });
    });

    it('it should PATCH car booking terms: min trip duration', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID(), minTripDurationId: 1 })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('minTripDurationId', 1);
          done();
        });
    });

    it('it should PATCH car booking terms: max trip duration', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/car/booking-terms`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ carId: testCar.getAlreadyTestID(), maxTripDurationId: 1 })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update booking terms successfully');
          res.body.should.have.property('data');
          res.body.should.have.property('data').to.be.an('object');
          res.body.should.have
            .property('data')
            .to.have.property('maxTripDurationId', 1);
          done();
        });
    });
  });

  describe('Car Retrieve Data', () => {
    it('it should GET car by vin', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-vin/${testCar.getAlreadyTestVIN()}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List Car by VIN');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car by user owner', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-user/${testCar.getAlreadyTestOwner()}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List Car(s) by user owner');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car by license plate', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-license/${testCar.getAlreadyTestLicense()}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List Car by license plate');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car by license, but return empty because license cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-license/AAA 000`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('List Car by license plate');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have.property('data').to.be.a('object').to.be.empty;
          done();
        });
    });

    it('it should GET car by id', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/${testCar.getAlreadyTestID()}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Retrieve Car by ID');
          res.body.should.have.property('data').to.be.an('object');
          done();
        });
    });

    it('it should GET car features by id', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/features/${testCar.getAlreadyTestID()}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List features by car');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car by query (license plate)', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/query/DLO`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List Cars by query');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car by query (license plate), but return empty because query not match', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/query/DLO 000`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List Cars by query');
          res.body.should.have.property('data').to.be.an('array').to.be.empty;
          done();
        });
    });

    it('it should NOT GET car by vin because vin cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-vin/LOOOOO254KJM78006`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List Car by VIN');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have.property('data').to.be.a('object').to.be.empty;
          done();
        });
    });

    it('it should NOT GET car by user owner because user cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/by-user/00888cca-1234-44a0-b3a3-ccce3c1ccdb2`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Owner uuid not found');
          done();
        });
    });

    it('it should NOT GET car by id because id cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/0`)
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('car with id 0 does not exist');
          done();
        });
    });

    it('it should NOT GET car features by id because id cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car/features/0`)
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Car not found');
          done();
        });
    });
  });
});
