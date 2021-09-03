Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeAddTransaction;

function makeAddTransaction({ paymentGateway }) {
  return async function addTransaction(paymentInfo) {
    return paymentGateway.makeTransaction(paymentInfo);
  };
}
