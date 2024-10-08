import { diffDays, formatFullDate, nowFormatDate } from '../../utils/dates';
import { paymentMethodsIcons } from '../../utils/enums';
import validateTransactionEvent from '../../utils/validate-transaction-event';

export default function makeListenTransactionEvents({
  transactionDb,
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
  sendReceiptMail,
  sendPaymentDeclinedMail,
}) {
  return async function listenTransactionEvents(eventInfo) {
    const transactionEvent = validateTransactionEvent(eventInfo);

    if (
      transactionEvent.constructor === Object &&
      Object.keys(transactionEvent).length > 0
    ) {
      if (transactionEvent.isValid) {
        const {
          data: {
            transaction: { id, reference, status },
          },
        } = eventInfo;

        const transactionUpdated = await transactionDb.updateStatus(
          id,
          reference,
          status
        );

        // 1. Obtener la inforamcion de la reserva
        const {
          dataValues: { bookingBy, bookingCar, checkin, checkout, pricePerDay },
        } = await bookingDb.findByTransaction(transactionUpdated.transactionId);

        // 2. Obtener la informacion del usuario que reservo
        const user = await userDb.findByUUID(bookingBy);

        // 3. Obtener la informacion del carro reservado
        const car = await carDb.findById(bookingCar);

        // 4. Obtener la informacion del metodo de pago
        const paymentMethod = await paymentUserDb.findById(
          transactionUpdated.paymentId
        );

        // 5. Calular los dias
        const days = diffDays({
          dateOne: checkin,
          dateTwo: checkout,
          type: 'JS',
        });

        const emailInfo = {
          emailToSend: user.email,
          carInfo: `${car.maker.name} ${car.model.name} ${car.year}`,
          carImage: car.images[0].imagePath,
          startDate: formatFullDate({ date: checkin, type: 'JS' }),
          endDate: formatFullDate({ date: checkout, type: 'JS' }),
          typePayment: paymentMethod.type,
          brandLogo: paymentMethod.brand
            ? paymentMethodsIcons[paymentMethod.brand]
            : paymentMethodsIcons.NEQUI,
          lastFour: paymentMethod.lastFour,
          nequiPhone: paymentMethod.nequiPhone,
          reference,
          pricePerDay,
          countDays: days,
          serviceFee: pricePerDay * days * 0.17,
          paidOn: nowFormatDate({ withYear: true }),
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
