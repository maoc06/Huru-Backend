import { email } from '../../config/mailer';

export default function makeSendReceiptMail() {
  return async function sendReceiptMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    reference,
    pricePerDay,
    countDays,
    serviceFee,
    typePayment,
    brandLogo,
    lastFour,
    nequiPhone,
  } = {}) {
    email
      .send({
        template: 'receipt',
        message: {
          from: '"Huru 🚗" <hurubymaja@gmail.com>',
          to: emailToSend,
        },
        locals: {
          carInfo,
          carImage,
          startDate,
          endDate,
          reference,
          pricePerDay,
          countDays,
          serviceFee,
          typePayment,
          brandLogo,
          lastFour,
          nequiPhone,
        },
      })
      .then(() => console.log('Receipt has been send to', emailToSend));
  };
}
