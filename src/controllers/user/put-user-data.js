export default function makePutUserData({ updateData }) {
  return async function putUserData(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const data = httpRequest.body;
      await updateData({ ...data });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'User successfully update',
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
