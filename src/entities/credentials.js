export default function buildMakeCredentials() {
  return function makeCredentials({ ...entity }) {
    const { email, password } = { ...entity };

    if (!email) throw new Error('User credentials must have an email');
    if (!password) throw new Error('User credentials must have a password');

    const credentials = Object.freeze({ ...entity });

    return credentials;
  };
}
