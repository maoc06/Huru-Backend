export default function makeGetTrasmission({ listTransmissions }) {
  return async function getTrasmission() {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const transmissions = await listTransmissions();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of trasmissions',
          data: transmissions,
        },
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
