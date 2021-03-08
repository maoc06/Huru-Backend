import fs from 'fs';

export default function validateFileSize(maxSize, filePath) {
  const stats = fs.statSync(filePath);
  if (stats.size > maxSize)
    throw new Error('File exceeds the maximum allowed size');
}
