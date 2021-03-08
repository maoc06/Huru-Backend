import validateMinimumAge from '../utils/validate-minimum-age';

export default function buildMakeUser() {
  return function makeUser({ ...entity }) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      identityDocument,
      dateOfBirth,
    } = { ...entity };

    if (!firstName) throw new Error('User must have a first name');
    if (!lastName) throw new Error('User must have a last name');
    if (!email) throw new Error('User must have an email');
    if (!password) throw new Error('User must have a password');
    if (password.length < 8)
      throw new Error('The password must be at least 8 characters long');
    if (!phone) throw new Error('User must have a phone number');
    if (!dateOfBirth) throw new Error('User must have a date of birth');
    if (!identityDocument)
      throw new Error('User must have a identity document number');
    // Validete minimum age (19 year old)
    if (!validateMinimumAge(dateOfBirth))
      throw new Error('User must be at least 19 years old to register');

    const user = Object.freeze({ ...entity });

    return user;
  };
}
