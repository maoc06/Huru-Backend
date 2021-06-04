"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddPaymentSourceCard;

function makeAddPaymentSourceCard({
  paymentGateway
}) {
  return async function addPaymentSourceCard(sourceInfo) {
    return paymentGateway.insertSourceCard(sourceInfo);
  };
}