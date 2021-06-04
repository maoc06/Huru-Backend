"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddPaymentSourceNequi;

function makeAddPaymentSourceNequi({
  paymentGateway
}) {
  return async function addPaymentSourceNequi(sourceInfo) {
    return paymentGateway.insertSourceNequi(sourceInfo);
  };
}