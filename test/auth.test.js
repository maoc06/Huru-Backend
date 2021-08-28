const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { AuthTestData } = require('../config/test/authTestsData.js');
const {
  loginWithTestUser,
  resetPasswordTestUser,
  removeRegistrationTestUser,
} = require('./commom.test');

chai.should();
chai.use(chaiHttp);

const testUser = new AuthTestData();
let accessToken = '';

describe('Authentication', () => {
  before(async () => {
    const res = await loginWithTestUser();
    accessToken = res.body.token;
  });

  after(() => removeRegistrationTestUser({ accessToken }));

  describe('User Registration', () => {
    it('it should POST a Huru user', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUser())
        .end((_, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('accessToken');
          res.body.should.have
            .property('message')
            .eql('User successfully register');
          res.body.should.have.property('accessToken').to.be.a('string');
          done();
        });
    });

    it('it should NOT POST a Huru user because email already exists', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUser())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('auth/user-email-already-exists');
          done();
        });
    });

    it('it should NOT POST a Huru user because phone number already exists', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserDuplicatePhone())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('auth/user-phone-already-exists');
          done();
        });
    });

    it('it should NOT POST a Huru user because identity document already exists', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserDuplicateDocument())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('auth/user-document-already-exists');
          done();
        });
    });

    it('it should NOT POST a Huru user because is under 19 years of age', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserUnderAge())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('User must be at least 19 years old to register');
          done();
        });
    });

    it('it should NOT POST a Huru user because email is not in a correct format', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserWrongEmailFormat())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Validation error: Validation isEmail on email failed');
          done();
        });
    });

    it('it should NOT POST a Huru user because password contains less than 6 characters', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserPasswordLessThatSix())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('Password must contain 6 characters');
          done();
        });
    });

    it('it should NOT POST a Huru user because phone has not been verified', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signup')
        .send(testUser.getUserWithoutPhoneVerified())
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('User must have phone verification property');
          done();
        });
    });
  });

  describe('User Login', () => {
    it('it should AUTH user and should retrieve the access token', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signin')
        .send(testUser.getUser())
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('token').lengthOf.above(0);
          done();
        });
    });

    it('it should NOT AUTH user because cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signin')
        .send({ email: 'user@not.found.com', password: 'password' })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('token').to.deep.include({
            status: 'error',
            message: 'auth/user-not-found',
          });
          done();
        });
    });

    it('it should NOT AUTH user with right email but wrong password', (done) => {
      chai
        .request(config.apiUrl)
        .post('/auth/signin')
        .send({ email: testUser.getUser().email, password: 'wrongPassword' })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.have.property('token').to.deep.include({
            status: 'error',
            message: 'auth/invalid-password',
          });
          done();
        });
    });
  });

  describe('User Management', () => {
    after(() => resetPasswordTestUser({ accessToken }));

    it('it should NOT PATCH user password because user cannot be found', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/user/password`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          uuid: 'c11d11ab-b1ef-4a11-9b0a-a1e11ebd2dd9',
          currPassword: 'wrongTestPassword',
          newPassword: 'newTestPassword',
        })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have
            .property('error')
            .eql('User with id c11d11ab-b1ef-4a11-9b0a-a1e11ebd2dd9 not found');
          done();
        });
    });

    it('it should NOT PATCH user password because value for current password it is wrong', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/user/password`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          uuid: testUser.getTestUID(),
          currPassword: 'wrongTestPassword',
          newPassword: 'newTestPassword',
        })
        .end((_, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('auth/invalid-password');
          done();
        });
    });

    it('it should PATCH user password', (done) => {
      chai
        .request(config.apiUrl)
        .patch(`/user/password`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          uuid: testUser.getTestUID(),
          currPassword: testUser.getTestUserCredentials().password,
          newPassword: 'newTestPassword',
        })
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have
            .property('message')
            .eql('Update user password successfully');
          done();
        });
    });
  });
});
