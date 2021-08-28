const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { PaymentMethodTestsData } = require('../config/test/paymentTestsData');
const {
  getTestUserID,
  loginWithTestUser,
  notValidAccessToken,
} = require('./commom.test');

chai.should();
chai.use(chaiHttp);

const testPaymentMethod = new PaymentMethodTestsData();
let accessToken = '';

describe('Payment Methods', () => {
  before(async () => {
    const res = await loginWithTestUser();
    accessToken = res.body.token;
  });

  it('it should GET all payments methods by user', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/by-user/${getTestUserID()}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql('List payment methods');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET a default payment method by user', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/default/${getTestUserID()}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have
          .property('message')
          .eql('Retrieve default payment method');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.an('array');
        done();
      });
  });

  it('it should GET a payment method by id', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/15891`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Retrieve payment method');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.a('object');
        res.body.should.have
          .property('data')
          .to.have.all.keys(
            'id',
            'addedBy',
            'type',
            'brand',
            'lastFour',
            'customerEmail',
            'phone',
            'status',
            'isDefault'
          );
        done();
      });
  });

  it('it should NOT GET all payments methods by user because cannot be found user', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/by-user/bb8a440e-2a53-4e4e-80cd-99ae6cb75cdb`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have
          .property('error')
          .eql(
            'User with id bb8a440e-2a53-4e4e-80cd-99ae6cb75cdb does not exist'
          );
        done();
      });
  });

  it('it should NOT GET a default payment method by user because cannot be found user', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/default/bb8a440e-2a53-4e4e-80cd-99ae6cb75cdb`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have
          .property('error')
          .eql(
            'User with id bb8a440e-2a53-4e4e-80cd-99ae6cb75cdb does not exist'
          );
        done();
      });
  });

  it('it should NOT GET a payment method by id because id cannot not be found', (done) => {
    chai
      .request(config.apiUrl)
      .get(`/payment-user/77`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Retrieve payment method');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.a('null');
        done();
      });
  });

  it('it should PUT a default payment method', (done) => {
    chai
      .request(config.apiUrl)
      .put(`/payment-user/default`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 15891, newDefault: 15892 })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have
          .property('message')
          .eql('Updated default payment sucessfully');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.a('object');
        res.body.should.have
          .property('data')
          .to.have.all.keys(
            'id',
            'addedBy',
            'type',
            'brand',
            'lastFour',
            'customerEmail',
            'phone',
            'status',
            'isDefault'
          );
        res.body.should.have.property('data').to.have.property('status', 1);
        res.body.should.have
          .property('data')
          .to.have.property('isDefault', true);
        done();
      });
  });

  it('it should NOT PUT a default payment method because that was supposed to be assigned by default does not exist', (done) => {
    chai
      .request(config.apiUrl)
      .put(`/payment-user/default`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 7, newDefault: 15892 })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have
          .property('error')
          .eql(
            'The payment method that was supposed to be assigned by default does not exist'
          );
        done();
      });
  });

  it('it should NOT PUT a default payment method because that was supposed to be assigned as a new default does not exist', (done) => {
    chai
      .request(config.apiUrl)
      .put(`/payment-user/default`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 15891, newDefault: 12 })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have
          .property('error')
          .eql(
            'The payment method that was supposed to be assigned as a new default does not exist'
          );
        done();
      });
  });

  it('it should NOT PUT a default payment method becasuse the id is not the expected data type', (done) => {
    chai
      .request(config.apiUrl)
      .put(`/payment-user/default`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 'type', newDefault: 15891 })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should NOT PUT a payment method to disable state becasuse the id is not the expected data type', (done) => {
    chai
      .request(config.apiUrl)
      .put(`/payment-user/default`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: false, newDefault: 15891 })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should PATCH a payment method to disable state', (done) => {
    chai
      .request(config.apiUrl)
      .patch(`/payment-user/disable`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 15891 })
      .end((_, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have
          .property('message')
          .eql('Updated disable payment sucessfully');
        res.body.should.have.property('data');
        res.body.should.have.property('data').to.be.a('object');
        res.body.should.have
          .property('data')
          .to.have.all.keys(
            'id',
            'addedBy',
            'type',
            'brand',
            'lastFour',
            'customerEmail',
            'phone',
            'status',
            'isDefault'
          );
        res.body.should.have.property('data').to.have.property('status', 2);
        done();
      });
  });

  it('it should NOT PATCH a payment method to disable state becasuse cannot be found', (done) => {
    chai
      .request(config.apiUrl)
      .patch(`/payment-user/disable`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 12 })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.have
          .property('error')
          .eql('The payment method you are trying to disable does not exist');
        done();
      });
  });

  it('it should NOT PATCH a payment method to disable state becasuse the id is not the expected data type', (done) => {
    chai
      .request(config.apiUrl)
      .patch(`/payment-user/disable`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: 'type' })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should NOT PATCH a payment method to disable state becasuse the id is not the expected data type', (done) => {
    chai
      .request(config.apiUrl)
      .patch(`/payment-user/disable`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ id: false })
      .end((_, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  describe('Cards', () => {
    it('it should POST an approved card', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaApproved())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Payment source Card successfully added');

          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'id',
              'addedBy',
              'type',
              'brand',
              'lastFour',
              'customerEmail',
              'phone',
              'status',
              'isDefault'
            );

          res.body.should.have
            .property('data')
            .to.have.property('id')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('addedBy')
            .eql(testPaymentMethod.getVisaApproved().uid);

          res.body.should.have
            .property('data')
            .to.have.property('type')
            .eql('CARD');

          res.body.should.have
            .property('data')
            .to.have.property('brand')
            .eql('VISA');

          res.body.should.have
            .property('data')
            .to.have.property('lastFour')
            .eql('4242');

          res.body.should.have
            .property('data')
            .to.have.property('customerEmail')
            .eql(testPaymentMethod.getVisaApproved().email);

          res.body.should.have
            .property('data')
            .to.have.property('phone')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('status')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('isDefault')
            .to.be.a('boolean');

          done();
        });
    });

    it('it should POST an declined card', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaDeclined())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Payment source Card successfully added');

          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'id',
              'addedBy',
              'type',
              'brand',
              'lastFour',
              'customerEmail',
              'phone',
              'status',
              'isDefault'
            );

          res.body.should.have
            .property('data')
            .to.have.property('id')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('addedBy')
            .eql(testPaymentMethod.getVisaApproved().uid);

          res.body.should.have
            .property('data')
            .to.have.property('type')
            .eql('CARD');

          res.body.should.have
            .property('data')
            .to.have.property('brand')
            .eql('VISA');

          res.body.should.have
            .property('data')
            .to.have.property('lastFour')
            .eql('1111');

          res.body.should.have
            .property('data')
            .to.have.property('customerEmail')
            .eql(testPaymentMethod.getVisaApproved().email);

          res.body.should.have
            .property('data')
            .to.have.property('phone')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('status')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('isDefault')
            .to.be.a('boolean');

          done();
        });
    });

    it('it should NOT POST a card because user cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaNotFoundUser())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT POST a card because the card number is not in the expected length range (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaNumberNotExpectedLengthRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source card must contain between 15-16 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card number is not in the expected length range (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(
          testPaymentMethod.getVisaNumberNotExpectedLengthRange(
            '41111111111111111111'
          )
        )
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source card must contain between 15-16 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. month is not in the expected length range (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpMonthNotExpectedLengthRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. month must contain 2 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. month is not in the expected length range (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpMonthNotExpectedLengthRange('777'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. month must contain 2 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. month it is not a valid month', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpMonthNotValid())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. month must between values 1 to 12');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. month it is not a valid month', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpMonthNotValid('-1'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. month must between values 1 to 12');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. year is not in the expected length range (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpYearNotExpectedLengthRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. year must contain 2 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. year is not in the expected length range (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpYearNotExpectedLengthRange('2026'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. year must contain 2 digits');
          done();
        });
    });

    it('it should NOT POST a card because the card exp. year is not older than the current year', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaExpYearNotOlderThatCurr())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('exp. year must be greather than the current year');
          done();
        });
    });

    it('it should NOT POST a card because the CVV is not in the expected length range (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaCVVNotExpectedLengthRange())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('CVV must contain between 3-4 digits');
          done();
        });
    });

    it('it should NOT POST a card because the CVV is not in the expected length range (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaCVVNotExpectedLengthRange('123456'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('CVV must contain between 3-4 digits');
          done();
        });
    });

    it('it should NOT POST a card because not belong to any of the allowed brands', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaNotAllowedBrand())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Source card must belong to any of the allowed brands (AMEX, VISA or MASTERCARD)'
            );
          done();
        });
    });

    it('it should NOT POST a card because not belong to any of the allowed brands', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaNotAllowedBrand('3811444460014705'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Source card must belong to any of the allowed brands (AMEX, VISA or MASTERCARD)'
            );
          done();
        });
    });

    it('it should NOT POST a card because not belong to any of the allowed brands', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getVisaNotAllowedBrand('3611444460014705'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql(
              'Source card must belong to any of the allowed brands (AMEX, VISA or MASTERCARD)'
            );
          done();
        });
    });

    it('it should NOT POST a card because request not set Authorization header', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .send(testPaymentMethod.getVisaApproved())
        .end((_, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should NOT POST a card because Authorization header set a not valid or expired token', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-card')
        .set({ Authorization: `Bearer ${notValidAccessToken}` })
        .send(testPaymentMethod.getVisaApproved())
        .end((_, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('Nequi', () => {
    it('it should POST an approved Nequi', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiApproved())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Payment source Nequi successfully added');

          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'id',
              'addedBy',
              'type',
              'brand',
              'lastFour',
              'customerEmail',
              'phone',
              'status',
              'isDefault'
            );

          res.body.should.have
            .property('data')
            .to.have.property('id')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('addedBy')
            .eql(testPaymentMethod.getNequiApproved().uid);

          res.body.should.have
            .property('data')
            .to.have.property('type')
            .eql('NEQUI');

          res.body.should.have
            .property('data')
            .to.have.property('brand')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('lastFour')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('customerEmail')
            .eql(testPaymentMethod.getNequiApproved().email);

          res.body.should.have
            .property('data')
            .to.have.property('phone')
            .eql(testPaymentMethod.getNequiApproved().phone);

          res.body.should.have
            .property('data')
            .to.have.property('status')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('isDefault')
            .to.be.a('boolean');

          done();
        });
    });

    it('it should POST an declined Nequi', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiDeclined())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.have
            .property('message')
            .eql('Payment source Nequi successfully added');

          res.body.should.have.property('data').to.be.a('object');
          res.body.should.have
            .property('data')
            .to.have.all.keys(
              'id',
              'addedBy',
              'type',
              'brand',
              'lastFour',
              'customerEmail',
              'phone',
              'status',
              'isDefault'
            );

          res.body.should.have
            .property('data')
            .to.have.property('id')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('addedBy')
            .eql(testPaymentMethod.getNequiDeclined().uid);

          res.body.should.have
            .property('data')
            .to.have.property('type')
            .eql('NEQUI');

          res.body.should.have
            .property('data')
            .to.have.property('brand')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('lastFour')
            .to.be.a('null');

          res.body.should.have
            .property('data')
            .to.have.property('customerEmail')
            .eql(testPaymentMethod.getNequiDeclined().email);

          res.body.should.have
            .property('data')
            .to.have.property('phone')
            .eql(testPaymentMethod.getNequiDeclined().phone);

          res.body.should.have
            .property('data')
            .to.have.property('status')
            .to.be.a('number');

          res.body.should.have
            .property('data')
            .to.have.property('isDefault')
            .to.be.a('boolean');

          done();
        });
    });

    it('it should NOT POST a Nequi because user cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiNotFoundUser())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number is not in the expected length (too short)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must contain 10 digits');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number is not in the expected length (too long)', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('3991111111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must contain 10 digits');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 1 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('1991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 2 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('2991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 4 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('4991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 5 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('5991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 6 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('6991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 7 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('7991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 8 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('8991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 9 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('9991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because phone number start with 0 number', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(testPaymentMethod.getNequiWrongFormat('0991111111'))
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Source Nequi must start with 3 number');
          done();
        });
    });

    it('it should NOT POST a Nequi because request not set Authorization header', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .send(testPaymentMethod.getNequiApproved())
        .end((_, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should NOT POST a Nequi because Authorization header set a not valid or expired token', (done) => {
      chai
        .request(config.apiUrl)
        .post('/payment/source-nequi')
        .set({ Authorization: `Bearer ${notValidAccessToken}` })
        .send(testPaymentMethod.getNequiApproved())
        .end((_, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
