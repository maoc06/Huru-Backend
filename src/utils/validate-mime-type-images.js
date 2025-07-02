export default function validateMimeTypeImages(mimetype) {
  if (
    mimetype !== 'image/png' &&
    mimetype !== 'image/jpeg' &&
    mimetype !== 'image/webp' &&
    mimetype !== 'image/jpg' &&
    mimetype !== 'image/gif' &&
    mimetype !== 'image/tiff' &&
    mimetype !== 'image/bmp' &&
    mimetype !== 'image/avif' &&
    mimetype !== 'image/heic' &&
    mimetype !== 'image/heif' &&
    mimetype !== 'image/heif-sequence' &&
    mimetype !== 'image/heic-sequence' &&
    mimetype !== 'image/heif-sequence' &&
    mimetype !== 'image/heic-sequence'
  )
    throw new Error('File type is not allowed');
}
