const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const {
  getTestUserID,
  loginWithTestUser,
  removeTestCarReview,
} = require('./commom.test');
const { CarReviewTestData } = require('../config/test/carReviewTestsData');

chai.should();
chai.use(chaiHttp);

let accessToken = '';
let createdReview = -1;

const testReview = new CarReviewTestData();

describe('Car Review', () => {
  before(async () => {
    const res = await loginWithTestUser();
    accessToken = res.body.token;
  });

  after(() => removeTestCarReview({ accessToken, reviewId: createdReview.id }));

  describe('Create', () => {
    it('it should NOT POST a car review because car cannot found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReviewNoCar())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('car trying to add a review not found');
          done();
        });
    });

    it('it should NOT POST a car review because the user trying to add the review does not exist', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReviewNoUserAdded())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('user trying to add the review does not exist');
          done();
        });
    });

    it('it should NOT POST a car review because the booking to trying to add the review does not exist', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReviewNoBooking())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('booking trying to add a review does not exist');
          done();
        });
    });

    it('it should NOT POST a car review because comment it is too short', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReviewMinLength())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'A car review must have a comment with length between 20 to 1000 characters'
            );
          done();
        });
    });

    it('it should NOT POST a car review because comment it is empty', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReviewEmptyComment())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT POST a car review because rating it outside the allowed range (too low)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getRatingOutRange({ ratingTestValue: 0.5 }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('A car review must have a rating between 1.0 to 5.0 value');
          done();
        });
    });

    it('it should NOT POST a car review because rating it outside the allowed range (negative)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getRatingOutRange({ ratingTestValue: -2.5 }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('A car review must have a rating between 1.0 to 5.0 value');
          done();
        });
    });

    it('it should NOT POST a car review because rating it outside the allowed range (too high)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getRatingOutRange({ ratingTestValue: 5.5 }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('A car review must have a rating between 1.0 to 5.0 value');
          done();
        });
    });

    it('it should NOT POST a car review because rating not expected data type', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getRatingOutRange({ ratingTestValue: 'rat' }))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('A car review must have a rating between 1.0 to 5.0 value');
          done();
        });
    });

    it('it should POST a car review', (done) => {
      chai
        .request(config.apiUrl)
        .post('/car-review')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testReview.getReview())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Car review successfully added');
          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'id',
              'carId',
              'addedBy',
              'bookingId',
              'comment',
              'rating',
              'createdAt'
            );
          res.body.should.have
            .property('data')
            .to.have.property('id')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('carId')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('addedBy')
            .to.be.a('string');

          res.body.should.have
            .property('data')
            .to.have.property('bookingId')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('comment')
            .to.be.a('string');

          res.body.should.have
            .property('data')
            .to.have.property('rating')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('rating')
            .to.be.a('number');
          createdReview = res.body.data;
          done();
        });
    });
  });

  describe('Car Review Retrieve Data', () => {
    it('it should NOT GET car reviews by car because car cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/${createdReview.id}`)
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('car not found');
          done();
        });
    });

    it('it should NOT GET car review because booking cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/already-reviewed/999`)
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('The booking with id 999 does not exist');
          done();
        });
    });

    it('it should GET car reviews by car', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/29`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('List car reviews');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });

    it('it should GET car review by booking', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/already-reviewed/1`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Retrieve if already reviewed');
          res.body.should.have.property('data').to.be.an('object');

          res.body.should.have
            .property('data')
            .to.have.all.keys('alreadyReviewed', 'comment', 'rating');

          res.body.should.have
            .property('data')
            .to.have.property('alreadyReviewed')
            .to.be.a('boolean');

          res.body.should.have
            .property('data')
            .to.have.property('alreadyReviewed', true);

          res.body.should.have
            .property('data')
            .to.have.property('comment')
            .to.be.a('string');

          res.body.should.have
            .property('data')
            .to.have.property('comment', testReview.getReview().comment);

          res.body.should.have
            .property('data')
            .to.have.property('rating')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('rating', testReview.getReview().rating);
          done();
        });
    });

    it('it should GET car review by booking but not already reviewed', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/already-reviewed/2`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Retrieve if already reviewed');
          res.body.should.have.property('data').to.be.an('object');

          res.body.should.have
            .property('data')
            .to.have.all.keys('alreadyReviewed');

          res.body.should.have
            .property('data')
            .to.have.property('alreadyReviewed')
            .to.be.a('boolean');

          res.body.should.have
            .property('data')
            .to.have.property('alreadyReviewed', false);

          done();
        });
    });

    it('it should GET all car reviews by user', (done) => {
      chai
        .request(config.apiUrl)
        .get(`/car-review/all-by-user/${getTestUserID()}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('List all reviews by user');
          res.body.should.have.property('data').to.be.an('array');
          done();
        });
    });
  });
});
