"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListenTransactionEvents;

var _dates = require("../../utils/dates");

var _enums = require("../../utils/enums");

var _validateTransactionEvent = _interopRequireDefault(require("../../utils/validate-transaction-event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeListenTransactionEvents({
  transactionDb,
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
  sendReceiptMail,
  sendPaymentDeclinedMail
}) {
  return async function listenTransactionEvents(eventInfo) {
    const transactionEvent = (0, _validateTransactionEvent.default)(eventInfo);

    if (transactionEvent.constructor === Object && Object.keys(transactionEvent).length > 0) {
      if (transactionEvent.isValid) {
        const {
          data: {
            transaction: {
              id,
              reference,
              status
            }
          }
        } = eventInfo;
        const transactionUpdated = await transactionDb.updateStatus(id, reference, status); // 1. Obtener la inforamcion de la reserva

        const {
          dataValues: {
            bookingBy,
            bookingCar,
            checkin,
            checkout,
            pricePerDay
          }
        } = await bookingDb.findByTransaction(transactionUpdated.transactionId); // 2. Obtener la informacion del usuario que reservo

        const user = await userDb.findByUUID(bookingBy); // 3. Obtener la informacion del carro reservado

        const car = await carDb.findById(bookingCar); // 4. Obtener la informacion del metodo de pago

        const paymentMethod = await paymentUserDb.findById(transactionUpdated.paymentId); // 5. Calular los dias

        const days = (0, _dates.diffDays)({
          dateOne: checkin,
          dateTwo: checkout,
          type: 'JS'
        });
        const emailInfo = {
          emailToSend: user.email,
          carInfo: `${car.maker.name} ${car.model.name} ${car.year}`,
          carImage: car.images[0].imagePath,
          startDate: (0, _dates.formatFullDate)({
            date: checkin,
            type: 'JS'
          }),
          endDate: (0, _dates.formatFullDate)({
            date: checkout,
            type: 'JS'
          }),
          typePayment: paymentMethod.type,
          brandLogo: paymentMethod.brand ? _enums.paymentMethodsIcons[paymentMethod.brand] : _enums.paymentMethodsIcons.NEQUI,
          lastFour: paymentMethod.lastFour,
          nequiPhone: paymentMethod.nequiPhone,
          reference,
          pricePerDay,
          countDays: days,
          serviceFee: pricePerDay * days * 0.17,
          paidOn: (0, _dates.nowFormatDate)({
            withYear: true
          })
        };

        switch (transactionEvent.status) {
          case 'APPROVED':
            sendReceiptMail(emailInfo);
            break;

          case 'DECLINED':
            sendPaymentDeclinedMail(emailInfo);
            break;

          case 'ERROR':
            console.log('ERROR');
            break;

          default:
            throw new Error('unkown-event-transaction-error');
        }
      }
    }

    return {};
  };
}