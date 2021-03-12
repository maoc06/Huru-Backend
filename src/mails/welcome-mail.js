import { email } from '../../config/mailer';

export default function makeSendWelcomeMail() {
  return async function sendWelcomeMail({ emailToSend, firstname, url } = {}) {
    email
      .send({
        template: 'welcome',
        message: {
          from: '"Huru 🚗" <hurubymaja@gmail.com>',
          to: emailToSend,
        },
        locals: {
          firstname,
          url,
        },
      })
      .then(() => console.log('Welcome email has been send to', emailToSend));
  };
}
