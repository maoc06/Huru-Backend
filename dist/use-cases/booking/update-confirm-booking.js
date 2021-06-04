"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateConfirmBooking;

var _generateReference = _interopRequireDefault(require("../../utils/generate-reference"));

var _dates = require("../../utils/dates");

var _enums = require("../../utils/enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeUpdateConfirmBooking({
  bookingDb,
  transactionDb,
  carDb,
  userDb,
  paymentUserDb,
  paymentGateway,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail
}) {
  return async function updateConfirmBooking({
    bookingId,
    confirm,
    email
  }) {
    switch (confirm) {
      case 5:
        {
          // booking approved
          // 1. cambiar el estado de la reserva a APPROVED
          const {
            id: bookingNumber,
            transactionId,
            bookingCar,
            pricePerDay,
            checkin,
            checkout
          } = await bookingDb.confirmBooking(bookingId, confirm); // 2. obtener el id del metodo de pago

          const {
            dataValues: {
              paymentId
            }
          } = await transactionDb.findById(transactionId); // 3. calcular los dias de reserva

          const days = (0, _dates.diffDays)({
            dateOne: checkin,
            dateTwo: checkout,
            type: 'JS'
          }); // 4. calcular el precio en centavos

          const amountInCents = pricePerDay * 100 * days;
          const serviceFee = amountInCents / 100 * 0.17;
          const totalPaidInCents = amountInCents + serviceFee * 100; // 5. generar una cadena aleatoria y unica para la referencia del pago

          const generatedReference = (0, _generateReference.default)(); // 6. crear el objeto de transaccion

          const transactionInfo = {
            amount_in_cents: totalPaidInCents,
            currency: 'COP',
            customer_email: email,
            payment_method: {
              installments: 1
            },
            reference: generatedReference,
            payment_source_id: paymentId
          }; // 7. realizar la transaccion

          const {
            data: {
              id,
              reference
            }
          } = await paymentGateway.makeTransaction(transactionInfo); // 8. actualizar el estado de la transaccion

          const response = await transactionDb.updateTrackingIdentifiers(transactionId, id, reference); // 9. Obtener la informacion del carro

          const {
            userOwner: {
              dataValues: {
                uuid: ownerId
              }
            },
            maker,
            model,
            year,
            images
          } = await carDb.findById(bookingCar); // 10. Obtener la informacion del dueño del carro
          // const userOwner = await carDb.findById(bookingCar);

          console.log(ownerId);
          const {
            dataValues: owner
          } = await userDb.findByUUID(ownerId); // 11. Obtener la informacion del metodo de pago

          const {
            dataValues: {
              type,
              brand,
              lastFour,
              phone: nequiPhone
            }
          } = await paymentUserDb.findById(paymentId); // 12. Prepara la informacion basica para enviar los emails

          const basicInfo = {
            emailToSend: email,
            carInfo: `${maker.name} ${model.name} ${year}`,
            carImage: images[0].imagePath,
            startDate: (0, _dates.formatFullDate)({
              date: checkin,
              type: 'JS'
            }),
            endDate: (0, _dates.formatFullDate)({
              date: checkout,
              type: 'JS'
            }),
            typePayment: type,
            brandLogo: brand ? _enums.paymentMethodsIcons[brand] : _enums.paymentMethodsIcons.NEQUI,
            lastFour,
            nequiPhone
          }; // 13. enviar correo de confirmacion

          sendBookingAcceptedtMail({ ...basicInfo,
            bookingNumber,
            owner: `${owner.firstName}`,
            phone: owner.phone,
            paid: totalPaidInCents / 100,
            paidOn: (0, _dates.nowFormatDate)({
              withYear: true
            })
          });
          return response;
        }

      case 6:
        {
          // Booking rejected
          const {
            transactionId,
            bookingCar,
            checkin,
            checkout
          } = await bookingDb.confirmBooking(bookingId, confirm); // Obtener la informacion del carro

          const {
            name,
            model,
            year,
            images
          } = await carDb.findById(bookingCar);
          const response = await transactionDb.updateRejectBooking(transactionId); // TODO -> cuando se rechace, permitir que el usuario pueda cambiar el metodo de pago

          sendBookingRejectedMail({
            emailToSend: email,
            carInfo: `${name} ${model} ${year}`,
            carImage: images[0].imagePath,
            startDate: (0, _dates.formatFullDate)(checkin),
            endDate: (0, _dates.formatFullDate)(checkout)
          });
          return response;
        }

      default:
        throw new Error('unkown-booking-confirm-code');
    }
  };
}