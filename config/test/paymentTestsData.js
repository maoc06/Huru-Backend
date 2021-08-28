class PaymentMethodTestsData {
  constructor() {
    this.visaApproved = {
      number: '4242424242424242',
      expMonth: '06',
      expYear: '29',
      cvc: '547',
      cardHolder: 'MIGUEL ORREGO TEST APPROVED',
      uid: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      email: 'huru@test.com',
    };

    this.visaDeclined = {
      number: '4111111111111111',
      expMonth: '06',
      expYear: '29',
      cvc: '547',
      cardHolder: 'MIGUEL ORREGO TEST DECLINED',
      uid: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      email: 'huru@test.com',
    };

    this.nequiApproved = {
      phone: '3991111111',
      uid: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      email: 'huru@test.com',
    };

    this.nequiDeclined = {
      phone: '3992222222',
      uid: '97b1fd63-7310-44cf-bd10-e796bb58d310',
      email: 'huru@test.com',
    };
  }

  getVisaApproved = () => this.visaApproved;

  getVisaDeclined = () => this.visaDeclined;

  getVisaNotFoundUser = () => {
    const visa = { ...this.visaApproved };
    visa.uid = '45000872-b000-4b00-9600-955f6f00c6aa';
    return visa;
  };

  getVisaNumberNotExpectedLengthRange = (numberValueTest = '42424242') => {
    const visa = { ...this.visaApproved };
    visa.number = numberValueTest;
    return visa;
  };

  getVisaExpMonthNotExpectedLengthRange = (expMonthValueTest = '6') => {
    const visa = { ...this.visaApproved };
    visa.expMonth = expMonthValueTest;
    return visa;
  };

  getVisaExpMonthNotValid = (expMonthValueTest = '33') => {
    const visa = { ...this.visaApproved };
    visa.expMonth = expMonthValueTest;
    return visa;
  };

  getVisaExpYearNotExpectedLengthRange = (expYearValueTest = '6') => {
    const visa = { ...this.visaApproved };
    visa.expYear = expYearValueTest;
    return visa;
  };

  getVisaExpYearNotOlderThatCurr = (expYearValueTest = '19') => {
    const visa = { ...this.visaApproved };
    visa.expYear = expYearValueTest;
    return visa;
  };

  getVisaCVVNotExpectedLengthRange = (cvcValueTest = '1') => {
    const visa = { ...this.visaApproved };
    visa.cvc = cvcValueTest;
    return visa;
  };

  getVisaNotAllowedBrand = (numberValueTest = '6011444460014705') => {
    const visa = { ...this.visaApproved };
    visa.number = numberValueTest;
    return visa;
  };

  getNequiApproved = () => this.nequiApproved;

  getNequiDeclined = () => this.nequiDeclined;

  getNequiNotFoundUser = () => {
    const nequi = { ...this.nequiApproved };
    nequi.uid = '45000872-b000-4b00-9600-955f6f00c6aa';
    return nequi;
  };

  getNequiWrongFormat = (phoneValueTest = '3991111') => {
    const nequi = { ...this.nequiApproved };
    nequi.phone = phoneValueTest;
    return nequi;
  };
}

module.exports = { PaymentMethodTestsData };
