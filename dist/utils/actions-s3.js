"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletFileS3 = exports.uploadFileS3 = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _imagemin = _interopRequireDefault(require("imagemin"));

var _imageminPngquant = _interopRequireDefault(require("imagemin-pngquant"));

var _imageminMozjpeg = _interopRequireDefault(require("imagemin-mozjpeg"));

var _config = require("../../config");

var _validateMimeTypeImages = _interopRequireDefault(require("./validate-mime-type-images"));

var _validateFileSize = _interopRequireDefault(require("./validate-file-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const credentialsAWS = () => {
  _awsSdk.default.config.getCredentials(err => {
    if (err) throw new Error('Error with the storage server');else console.log('AWS SDk is correctly configured');
  });
};

const uploadFileS3 = async (file, subfolder) => {
  const stateObj = {
    success: false,
    url: ''
  };
  const {
    originalname,
    mimetype
  } = file;
  let {
    buffer
  } = file;
  if (!file) throw new Error('File null');
  (0, _validateMimeTypeImages.default)(mimetype);

  if ((0, _validateFileSize.default)(2000000, buffer)) {
    // Si el tamaño sobre pasa el limite:
    // Comprimir con imagemin
    const compressFile = await _imagemin.default.buffer(buffer, {
      plugins: [(0, _imageminPngquant.default)({
        quality: [0.65, 0.7]
      }), (0, _imageminMozjpeg.default)({
        quality: 70
      })]
    });
    buffer = compressFile;
  }

  credentialsAWS();
  const s3 = new _awsSdk.default.S3({
    apiVersion: '2006-03-01'
  }); // setting up S3 upload parameters

  const params = {
    Bucket: _config.config.awsBucketName,
    Key: `${subfolder}/${originalname}`,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read'
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
};

exports.uploadFileS3 = uploadFileS3;

const deletFileS3 = async ({
  subfolder = 'users',
  key
}) => {
  credentialsAWS();
  const s3 = new _awsSdk.default.S3({
    apiVersion: '2006-03-01'
  }); // setting up S3 upload parameters

  const params = {
    Bucket: _config.config.awsBucketName,
    Key: `${subfolder}/${key}`
  };
  s3.deleteObject(params, err => {
    if (err) console.log(err, err.stack);
  });
};

exports.deletFileS3 = deletFileS3;