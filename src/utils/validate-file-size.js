export default function validateFileSize(maxSize, buffer) {
  if (buffer.byteLength > maxSize)
    throw new Error('File exceeds the maximum allowed size');
}
