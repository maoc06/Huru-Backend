"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uploadFileS3;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = require("../../config");

var _validateMimeTypeImages = _interopRequireDefault(require("./validate-mime-type-images"));

var _validateFileSize = _interopRequireDefault(require("./validate-file-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function uploadFileS3(file) {
  const stateObj = {
    success: false,
    url: ''
  };
  const {
    originalname,
    mimetype,
    buffer
  } = file;
  if (!file) throw new Error('File null');
  (0, _validateMimeTypeImages.default)(mimetype);
  (0, _validateFileSize.default)(6000000, buffer);

  _awsSdk.default.config.getCredentials(err => {
    if (err) throw new Error('Error with the storage server');else console.log('AWS SDk is correctly configured');
  });

  const s3 = new _awsSdk.default.S3({
    apiVersion: '2006-03-01'
  }); // setting up S3 upload parameters

  const params = {
    Bucket: _config.config.awsBucketName,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype
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