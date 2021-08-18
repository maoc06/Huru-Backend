import { email } from '../../config/mailer';

export default function makeSendBookingAcceptedtMail() {
  return async function sendBookingAcceptedtMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    freeCancellationDate,
    parcialCancellationDate,
    bookingNumber,
    owner,
    phone,
    typePayment,
    brandLogo,
    lastFour,
    nequiPhone,
    paid,
    paidOn,
  } = {}) {
    email
      .send({
        template: 'booking-accepted',
        message: {
          from: '"Huru 🚗" <hurubymaja@gmail.com>',
          to: emailToSend,
        },
        locals: {
          carInfo,
          carImage,
          startDate,
          endDate,
          freeCancellationDate,
          parcialCancellationDate,
          bookingNumber,
          owner,
          phone,
          typePayment,
          brandLogo,
          lastFour,
          nequiPhone,
          paid,
          paidOn,
        },
      })
      .then(() =>
        console.log('Booking accepted has been send to', emailToSend)
      );
  };
}
