export default function makePatchStatus({ updateStatus }) {
  return async function patchStatus(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { uuid, status } = httpRequest.body;

    try {
      await updateStatus({ uuid, status });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update user status successfully',
        },
      };
    } catch (e) {
      console.log(e);
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
