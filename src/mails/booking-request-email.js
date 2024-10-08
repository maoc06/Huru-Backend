import { email } from '../../config/mailer';

export default function makeSendBookingRequestMail() {
  return async function sendBookingRequestMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    applicant,
    url,
  } = {}) {
    email
      .send({
        template: 'booking-request',
        message: {
          from: '"Huru 🚗" <hurubymaja@gmail.com>',
          to: emailToSend,
        },
        locals: {
          carInfo,
          carImage,
          startDate,
          endDate,
          applicant,
          url,
        },
      })
      .then(() => console.log('Booking request has been send to', emailToSend));
  };
}
