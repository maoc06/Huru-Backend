"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateFileSize;

function validateFileSize(maxSize, buffer) {
  if (buffer.byteLength > maxSize) throw new Error('File exceeds the maximum allowed size');
}