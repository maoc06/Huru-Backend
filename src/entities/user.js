import { validateMin } from '../utils/dates';

export default function buildMakeUser() {
  return function makeUser({ ...entity }) {
    const {
      firstName,
      lastName,
      email,
      phone,
      identityDocument,
      dateOfBirth,
      isPhoneVerified,
    } = { ...entity };

    if (!firstName) throw new Error('User must have a first name');
    if (!lastName) throw new Error('User must have a last name');
    if (!email) throw new Error('User must have an email');
    if (!phone) throw new Error('User must have a phone number');
    if (!dateOfBirth) throw new Error('User must have a date of birth');
    if (!identityDocument)
      throw new Error('User must have a identity document number');
    // Validete minimum age (19 year old)
    if (!validateMin(dateOfBirth, 19))
      throw new Error('User must be at least 19 years old to register');
    if (isPhoneVerified === null || isPhoneVerified === undefined)
      throw new Error('User must have phone verification property');

    const user = Object.freeze({ ...entity });

    return user;
  };
}
