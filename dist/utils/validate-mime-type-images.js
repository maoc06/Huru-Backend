"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateMimeTypeImages;

function validateMimeTypeImages(mimetype) {
  if (mimetype !== 'image/png' && mimetype !== 'image/jpeg' && mimetype !== 'image/webp') throw new Error('File type is not allowed');
}