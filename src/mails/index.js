import makeSendWelcomeMail from './welcome-mail';
import makeSendBookingRequestMail from './booking-request-email';
import makeSendBookingAcceptedtMail from './booking-accepted-email';
import makeSendBookingRejectedMail from './booking-rejected-email';
import makeSendReceiptMail from './receipt-email';
import makeSendPaymentDeclinedMail from './payment-declined';

const sendWelcomeMail = makeSendWelcomeMail();
const sendBookingRequestMail = makeSendBookingRequestMail();
const sendBookingAcceptedtMail = makeSendBookingAcceptedtMail();
const sendBookingRejectedMail = makeSendBookingRejectedMail();
const sendReceiptMail = makeSendReceiptMail();
const sendPaymentDeclinedMail = makeSendPaymentDeclinedMail();

export default {
  sendWelcomeMail,
  sendBookingRequestMail,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail,
  sendReceiptMail,
  sendPaymentDeclinedMail,
};
