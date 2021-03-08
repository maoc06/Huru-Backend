import FileType from 'file-type';

export default async function validateMimeTypeImages(filePath) {
  let fileType = {};

  await (async () => {
    fileType = await FileType.fromFile(filePath);
  })();

  if (fileType.ext !== 'png' && fileType.ext !== 'jpg')
    throw new Error('File type is not allowed');

  return fileType;
}
