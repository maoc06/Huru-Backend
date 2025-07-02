const AWS = require('aws-sdk');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const { config } = require('../../config');
const validateMimeTypeImages = require('./validate-mime-type-images').default;
const validateFileSize = require('./validate-file-size').default;

AWS.config.update({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

const bucket = config.awsBucketName;

const uploadFileS3 = async (file, subfolder) => {
  if (!file) {
    return {
      location:
        'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg',
    };
  }

  let { originalname, mimetype, buffer } = file;

  validateMimeTypeImages(mimetype);
  if (validateFileSize(2000000, buffer)) {
    const compressFile = await imagemin.buffer(buffer, {
      plugins: [
        imageminMozjpeg({ quality: 50 }),
        imageminPngquant({
          quality: [0.5, 0.6],
        }),
      ],
    });
    buffer = compressFile;
  }

  const params = {
    Bucket: bucket,
    Key: `${subfolder}/${originalname}`,
    Body: buffer,
    ACL: 'public-read',
    ContentType: mimetype,
  };

  const stored = await s3.upload(params).promise();
  return stored;
};

const deletFileS3 = async ({ subfolder = 'users', key }) => {
  const params = {
    Bucket: bucket,
    Key: `${subfolder}/${key}`,
  };

  await s3.deleteObject(params).promise();
};

module.exports = {
  uploadFileS3,
  deletFileS3,
};
