class AuthTestData {
  constructor() {
    this.testUID = '97b1fd63-7310-44cf-bd10-e796bb58d310';

    this.testUserCredentials = {
      email: 'huru@test.com',
      password: 'hurutest',
    };

    this.notValidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7InVpZCI6Ijk3YjFmZDYzLTczMTAtNDRjZi1iZDEwLWU3OTZiYjU4ZDMxMCIsImZpcnN0TmFtZSI6Ik1pZ3VlbCIsImxhc3ROYW1lIjoiT3JyZWdvIiwiZW1haWwiOiJodXJ1QHRlc3QuY29tIiwidXNlclR5cGUiOjEsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJwaG9uZSI6Iis1NzMxODMzNjAzODgiLCJjcmVhdGVkQXQiOiIyMDIxLTA4LTI3VDE2OjA5OjM5LjYyM1oiLCJtb2RpZmllZEF0IjoiMjAyMS0wOC0yN1QxNjowOTozOS42MjNaIiwic3RhdHVzIjoyLCJpc0VtYWlsVmVyaWZpZWQiOmZhbHNlLCJpc1Bob25lVmVyaWZpZWQiOnRydWV9LCJpYXQiOjE2MzAwODE0NzEsImV4cCI6MTYzMDk0NTQ3MX0.vKzkr7lnhfW4-WebXY1OjZXKv_JpExom0bq63ve3l7U';

    this.authUser = {
      firstName: 'Luis Alberto',
      lastName: 'Spinetta',
      email: 'luis_spinetta@gmail.com',
      password: 'luis_spinetta',
      phone: '+573113071085',
      identityDocument: '1053478041',
      dateOfBirth: '1950-01-23',
      isPhoneVerified: true,
    };
  }

  getTestUID = () => this.testUID;

  getTestUserCredentials = () => this.testUserCredentials;

  getNotValidToken = () => this.notValidToken;

  getUser = () => this.authUser;

  getUserDuplicatePhone = () => {
    const user = { ...this.authUser };
    user.email = 'alberto_spinetta@hotmail.com';
    user.identityDocument = '1000488477';
    return user;
  };

  getUserDuplicateDocument = () => {
    const user = { ...this.authUser };
    user.email = 'alberto_spinetta@hotmail.com';
    user.phone = '+573182547114';
    return user;
  };

  getUserUnderAge = () => {
    const user = { ...this.authUser };
    user.email = 'alberto_spinetta@hotmail.com';
    user.identityDocument = '1000488477';
    user.phone = '+573182547114';
    user.dateOfBirth = '2008-08-20';
    return user;
  };

  getUserWrongEmailFormat = () => {
    const user = { ...this.authUser };
    user.email = 'luis_alberto_spinetta.com';
    user.identityDocument = '1000488477';
    user.phone = '+573182547114';
    return user;
  };

  getUserPasswordLessThatSix = () => {
    const user = { ...this.authUser };
    user.email = 'alberto_spinetta@hotmail.com';
    user.identityDocument = '1000488477';
    user.phone = '+573182547114';
    user.password = 'pass';
    return user;
  };

  getUserWithoutPhoneVerified = () => {
    const user = { ...this.authUser };
    user.email = 'alberto_spinetta@hotmail.com';
    user.identityDocument = '1000488477';
    user.phone = '+573182547114';
    delete user.isPhoneVerified;
    return user;
  };
}

module.exports = { AuthTestData };
