import crypto from 'crypto';

export default function generateReference() {
  return crypto.randomBytes(8).toString('hex');
}
