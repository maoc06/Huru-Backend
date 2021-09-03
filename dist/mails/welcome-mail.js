Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeSendWelcomeMail;

const _mailer = require('../../config/mailer');

function makeSendWelcomeMail() {
  return async function sendWelcomeMail({ emailToSend, firstname, url } = {}) {
    _mailer.email
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
