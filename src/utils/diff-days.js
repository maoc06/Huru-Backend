export default function diffDays(checkin, checkout) {
  const dateIn = new Date(checkin);
  const dateOut = new Date(checkout);

  const diffTime = dateOut.getTime() - dateIn.getTime();

  return Math.floor(diffTime / (1000 * 3600 * 24));
}
