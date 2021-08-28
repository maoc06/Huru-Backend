const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { BookingTestData } = require('../config/test/bookingTestsData');
const {
  getTestCarID,
  getTestUserID,
  loginWithTestUser,
  removeRegistrationTestBooking,
} = require('./commom.test');

chai.should();
chai.use(chaiHttp);

const CANCELED_ID = 7;

let accessToken = '';
let bookingCreated = -1;
const testBooking = new BookingTestData();

describe('Booking', () => {
  before(async () => {
    const res = await loginWithTestUser();
    accessToken = res.body.token;
  });

  after(() =>
    removeRegistrationTestBooking({ accessToken, bookingId: bookingCreated.id })
  );

  describe('Create', () => {
    it('it should NOT POST a booking because payment method that is intended to be used for the transaction does not exist', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getNotExistPayment())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'The payment method to be used for the transaction does not exist'
            );
          done();
        });
    });

    it('it should NOT POST a booking because car cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getNotExistCar())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('The car trying to assign to the reservation does not exist');
          done();
        });
    });

    it('it should NOT POST a booking because user trying to booking does not exist', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getNotExistUser())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('The user trying to assign to the reservation does not exist');
          done();
        });
    });

    it('it should NOT POST a booking because price per day is outside the supported range (too low)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getPriceOutOfRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Booking must have a price per day between $42,500 - $1,000,000 COP'
            );
          done();
        });
    });

    it('it should NOT POST a booking because price per day is outside the supported range (too high)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getPriceOutOfRange(1250000))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Booking must have a price per day between $42,500 - $1,000,000 COP'
            );
          done();
        });
    });

    it('it should NOT POST a booking because check in date is not in the future', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getDateNotInFuture({ isCheckIn: true }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Check in date for booking must be made on a future date');
          done();
        });
    });

    it('it should NOT POST a booking because check out date is not in the future', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getDateNotInFuture({ isCheckIn: false }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Check out date for booking must be made on a future date');
          done();
        });
    });

    it('it should NOT POST a booking because check out date is not greater than check in date', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getDateOutNotGreaterThatIn())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Check out date for booking must be greater than check in date'
            );
          done();
        });
    });

    it('it should POST a booking', (done) => {
      chai
        .request(config.apiUrl)
        .post('/booking')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getBooking())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Booking successfully');
          res.body.should.have.property('data').to.be.a('object');
          bookingCreated = res.body.data;
          done();
        });
    });
  });

  describe('States Management', () => {
    it('it should NOT PUT booking to accept because booking not exist', (done) => {
      chai
        .request(config.apiUrl)
        .put('/booking/confirm')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getConfirm({ bookingId: 9999 }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Booking not exist');
          done();
        });
    });

    it('it should NOT PUT booking to reject because booking not exist', (done) => {
      chai
        .request(config.apiUrl)
        .put('/booking/confirm')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getConfirm({ bookingId: 9999, isAccept: false }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('Booking not exist');
          done();
        });
    });

    it('it should PUT booking to accept', (done) => {
      chai
        .request(config.apiUrl)
        .put('/booking/confirm')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getConfirm({ bookingId: bookingCreated.id }))
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Booking successfully');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'reference',
              'status',
              'transactionId',
              'transactionNumber',
              'paymentId'
            );
          done();
        });
    });

    it('it should PUT booking to reject', (done) => {
      chai
        .request(config.apiUrl)
        .put('/booking/confirm')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(
          testBooking.getConfirm({
            bookingId: bookingCreated.id,
            isAccept: false,
          })
        )
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Booking successfully');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'reference',
              'status',
              'transactionId',
              'transactionNumber',
              'paymentId'
            );
          res.body.should.have
            .property('data')
            .to.have.property('reference', '---');
          res.body.should.have
            .property('data')
            .to.have.property('transactionNumber', '---');
          done();
        });
    });

    it('it should PUT booking to cancel', (done) => {
      chai
        .request(config.apiUrl)
        .put('/booking/cancel')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testBooking.getCancel({ bookingId: bookingCreated.id }))
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Booking cancelled succesfully');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.property('bookingStatus', CANCELED_ID);
          done();
        });
    });
  });

  describe('Booking Retrieve Data', () => {
    it('it should NOT GET upcoming bookings by user because uid cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/upcoming/2073ecc1-0000-45b8-be0f-de36db5c9c3b`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('User not found');
          done();
        });
    });

    it('it should NOT GET history bookings by user because uid cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/history/2073ecc1-0000-45b8-be0f-de36db5c9c3b`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('User not found');
          done();
        });
    });

    it('it should NOT GET count completed trips by user because uid cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(
          `/booking/count-completed-trips/2073ecc1-0000-45b8-be0f-de36db5c9c3b`
        )
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('User with id 2073ecc1-0000-45b8-be0f-de36db5c9c3b not found');
          done();
        });
    });

    it('it should NOT GET count completed trips by car because car id cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/count-completed-trips-by-car/999`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Car with id 999 not found');
          done();
        });
    });

    it('it should GET booking by id', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/${bookingCreated.id}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Retrieve booking');
          done();
        });
    });

    it('it should GET booking requests by user owner', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/by-owner/${getTestUserID()}/true`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List bookings request by user owner');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET upcoming bookings by user', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/upcoming/${getTestUserID()}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List upcoming bookings by user');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET history bookings by user', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/history/${getTestUserID()}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List booking history by user');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET count completed trips by user', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/count-completed-trips/${getTestUserID()}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('count');
          res.body.should.have
            .property('message')
            .eql('Count completed trips by user');
          res.body.should.have.property('count').to.be.a('number');
          done();
        });
    });

    it('it should GET count completed trips by car', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/booking/count-completed-trips-by-car/${getTestCarID()}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('count');
          res.body.should.have
            .property('message')
            .eql('Count completed trips by car');
          res.body.should.have.property('count').to.be.a('number');
          done();
        });
    });
  });
});
