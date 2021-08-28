export default function buildMakePaymentNequi() {
  return function makePaymentNequi({ ...entity }) {
    const { phone, uid, email } = {
      ...entity,
    };

    if (!phone) throw new Error('Source Nequi must have a phone number');
    if (!uid) throw new Error('Source Nequi must have an user');
    if (!email) throw new Error('Source Nequi must have an email');

    if (phone.length !== 10)
      throw new Error('Source Nequi must contain 10 digits');

    if (!/^3/.test(phone))
      throw new Error('Source Nequi must start with 3 number');

    const paymentNequi = Object.freeze({ ...entity });

    return paymentNequi;
  };
}
