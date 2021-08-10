export default function makeGetUserByQuery({ listQuery }) {
  return async function getUserByQuery(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { query } = httpRequest.params;

    try {
      const users = await listQuery({ query });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve a users',
          data: users,
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
