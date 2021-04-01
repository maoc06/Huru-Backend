import { email } from '../../config/mailer';

export default function makeSendBookingRejectedMail() {
  return async function sendBookingRejectedMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
  } = {}) {
    email
      .send({
        template: 'booking-rejected',
        message: {
          from: '"Huru 🚗" <hurubymaja@gmail.com>',
          to: emailToSend,
        },
        locals: {
          carInfo,
          carImage,
          startDate,
          endDate,
        },
      })
      .then(() =>
        console.log('Booking rejected has been send to', emailToSend)
      );
  };
}
