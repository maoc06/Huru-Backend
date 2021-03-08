import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';

import { config } from '../../config';
import validateMimeTypeImages from './validate-mime-type-images';
import validateFileSize from './validate-file-size';

export default async function uploadFileS3(filePath) {
  const stateObj = { success: false, url: '' };

  if (!fs.existsSync(filePath)) throw new Error('File does not exist');

  await validateMimeTypeImages(filePath);

  validateFileSize(2000000, filePath);

  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  AWS.config.getCredentials((err) => {
    if (err) throw new Error('Error with the storage server');
    else console.log('AWS SDk is correctly configured');
  });

  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  // setting up S3 upload parameters
  const params = {
    Bucket: config.awsBucketName,
    Key: fileName,
    Body: fileContent,
  };

  await (async () => {
    try {
      const file = await s3.upload(params).promise();
      stateObj.success = true;
      stateObj.url = file.Location;
    } catch (err) {
      throw new Error(err);
    }
  })();

  return stateObj;
}
