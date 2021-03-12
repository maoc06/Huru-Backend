import jwt from 'jsonwebtoken';

export default function makeHandleToken() {
  return function handleToken(info, privateKey, expiresIn = '10 days') {
    return jwt.sign({ info }, privateKey, {
      expiresIn,
    });
  };
}
