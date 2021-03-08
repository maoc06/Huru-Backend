export default function makeGetMaxTrip({ listMaxTrip }) {
  return async function getMaxTrip() {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const maxTrip = await listMaxTrip();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of max trip duration options',
          data: maxTrip,
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
