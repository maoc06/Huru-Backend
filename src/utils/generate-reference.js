import crypto from 'crypto';

export default function generateReference() {
  return crypto.randomBytes(8).toString('hex');
  // return crypto.createHash('sha1').update(paymentId.toString()).digest('hex');
}
