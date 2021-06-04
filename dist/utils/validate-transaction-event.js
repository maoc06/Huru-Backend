"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateTransactionEvent;

var _crypto = _interopRequireDefault(require("crypto"));

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateTransactionEvent(eventInfo) {
  const {
    event
  } = eventInfo;

  if (event === 'transaction.updated') {
    let signatureEvent = '';
    const {
      signature: {
        properties,
        checksum: eventChecksum
      },
      data: {
        transaction: {
          status
        }
      },
      data,
      timestamp
    } = eventInfo;
    properties.forEach(property => {
      const str = property.split('.');
      signatureEvent = signatureEvent.concat('', data[str[0]][str[1]]);
    });
    signatureEvent = signatureEvent.concat('', timestamp);
    signatureEvent = signatureEvent.concat('', _config.config.payEventsPrivateKey);

    const checksum = _crypto.default.createHash('sha256').update(signatureEvent).digest('hex');

    if (checksum === eventChecksum) return {
      isValid: true,
      status
    };
    return {
      isValid: false,
      status
    };
  }

  return {};
}