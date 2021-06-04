"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateFileSize;

async function validateFileSize(maxSize, buffer) {
  if (buffer.byteLength > maxSize) {
    return true;
  }

  return false;
}