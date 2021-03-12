export default async function validateFileSize(maxSize, buffer) {
  if (buffer.byteLength > maxSize) {
    return true;
  }
  return false;
}
