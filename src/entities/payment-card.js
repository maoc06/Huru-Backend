export default function buildMakePaymentCard() {
  return function makePaymentCard({ ...entity }) {
    const { number, expMonth, expYear, cvc, cardHolder, uid, email } = {
      ...entity,
    };

    if (!number) throw new Error('Source card must have a number');
    if (!expMonth) throw new Error('Source card must have an exp. montg');
    if (!expYear) throw new Error('Source card must have an exp. year');
    if (!cvc) throw new Error('Source card must have a cvc');
    if (!cardHolder) throw new Error('Source card must have a holder name');
    if (!uid) throw new Error('Source card must have an user');
    if (!email) throw new Error('Source card must have an email');

    if (!(number.length >= 15 && number.length <= 16))
      throw new Error('Source card must contain between 15-16 digits');

    if (!/^[45]|^3[47]/.test(number))
      throw new Error(
        'Source card must belong to any of the allowed brands (AMEX, VISA or MASTERCARD)'
      );

    if (expMonth.length !== 2)
      throw new Error('exp. month must contain 2 digits');

    if (!(parseInt(expMonth, 10) >= 1 && parseInt(expMonth, 10) <= 12))
      throw new Error('exp. month must between values 1 to 12');

    if (expYear.length !== 2)
      throw new Error('exp. year must contain 2 digits');

    if (
      parseInt(expYear, 10) <=
      parseInt(String(new Date().getFullYear()).slice(2), 10)
    ) {
      throw new Error('exp. year must be greather than the current year');
    }

    if (!(cvc.length >= 3 && cvc.length <= 4))
      throw new Error('CVV must contain between 3-4 digits');

    const paymentCard = Object.freeze({ ...entity });

    return paymentCard;
  };
}
