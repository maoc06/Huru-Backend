const chai = require('chai');
const chaiHttp = require('chai-http');
const { config } = require('../config');
const { AuthTestData } = require('../config/test/authTestsData.js');
const { CarTestsData } = require('../config/test/carTestsData');

chai.use(chaiHttp);

const testUser = new AuthTestData();
const testCar = new CarTestsData();

const getTestUserID = () => testUser.getTestUID();

const getTestCarID = () => testCar.getAlreadyTestID();

const loginWithTestUser = async () =>
  chai
    .request(config.apiUrl)
    .post('/auth/signin')
    .send(testUser.getTestUserCredentials());

const resetPasswordTestUser = async ({ accessToken }) =>
  chai
    .request(config.apiUrl)
    .patch('/user/password')
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({
      uuid: testUser.getTestUID(),
      currPassword: 'newTestPassword',
      newPassword: testUser.getTestUserCredentials().password,
    });

const removeRegistrationTestUser = async ({ accessToken }) =>
  chai
    .request(config.apiUrl)
    .delete(`/user/${testUser.getUser().email}`)
    .set({ Authorization: `Bearer ${accessToken}` });

const removeRegistrationTestCar = async ({ accessToken, carId }) =>
  chai
    .request(config.apiUrl)
    .delete(`/car/${carId}`)
    .set({ Authorization: `Bearer ${accessToken}` });

const removeRegistrationTestBooking = ({ accessToken, bookingId }) =>
  chai
    .request(config.apiUrl)
    .delete(`/booking/${bookingId}`)
    .set({ Authorization: `Bearer ${accessToken}` });

const notValidAccessToken = () => testUser.getNotValidToken();

module.exports = {
  getTestCarID,
  getTestUserID,
  loginWithTestUser,
  resetPasswordTestUser,
  removeRegistrationTestUser,
  removeRegistrationTestCar,
  removeRegistrationTestBooking,
  notValidAccessToken,
};
