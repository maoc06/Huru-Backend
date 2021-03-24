import validateTransactionEvent from '../../utils/validateTransactionEvent';

export default function makeListenTransactionEvents() {
  return async function listenTransactionEvents(eventInfo) {
    const transactionEvent = validateTransactionEvent(eventInfo);

    if (
      transactionEvent.constructor === Object &&
      Object.keys(transactionEvent).length > 0
    ) {
      if (transactionEvent.isValid) {
        switch (transactionEvent.status) {
          case 'APPROVED':
            break;
          case 'DECLINED':
            break;
          case 'ERROR':
            break;
          default:
            throw new Error('unkown-event-transaction-error');
        }
      }
    }

    return {};
  };
}
