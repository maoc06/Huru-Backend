export default function makePatchPassword({ updatePassword }) {
  return async function patchPassword(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const passwordData = httpRequest.body;

    try {
      await updatePassword({ passwordData });

      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update user password successfully',
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
