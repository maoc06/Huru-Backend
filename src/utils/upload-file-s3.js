import AWS from 'aws-sdk';

import { config } from '../../config';
import validateMimeTypeImages from './validate-mime-type-images';
import validateFileSize from './validate-file-size';

export default async function uploadFileS3(file) {
  const stateObj = { success: false, url: '' };
  const { originalname, mimetype, buffer } = file;

  if (!file) throw new Error('File null');

  validateMimeTypeImages(mimetype);
  validateFileSize(6000000, buffer);

  AWS.config.getCredentials((err) => {
    if (err) throw new Error('Error with the storage server');
    else console.log('AWS SDk is correctly configured');
  });

  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // setting up S3 upload parameters
  const params = {
    Bucket: config.awsBucketName,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype,
  };

  await (async () => {
    try {
      const uploadedFile = await s3.upload(params).promise();
      stateObj.success = true;
      stateObj.url = uploadedFile.Location;
    } catch (err) {
      throw new Error(err);
    }
  })();

  return stateObj;
}
