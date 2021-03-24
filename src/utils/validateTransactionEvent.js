import crypto from 'crypto';
import { config } from '../../config';

export default function validateTransactionEvent(eventInfo) {
  const { event } = eventInfo;

  if (event === 'transaction.updated') {
    let signatureEvent = '';

    const {
      signature: { properties, checksum: eventChecksum },
      data: {
        transaction: { status },
      },
      data,
      timestamp,
    } = eventInfo;

    properties.forEach((property) => {
      const str = property.split('.');
      signatureEvent = signatureEvent.concat('', data[str[0]][str[1]]);
    });

    signatureEvent = signatureEvent.concat('', timestamp);
    signatureEvent = signatureEvent.concat('', config.payEventsPrivateKey);

    const checksum = crypto
      .createHash('sha256')
      .update(signatureEvent)
      .digest('hex');

    if (checksum === eventChecksum) return { isValid: true, status };
    return { isValid: false, status };
  }
  return {};
}
