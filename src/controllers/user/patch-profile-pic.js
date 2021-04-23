export default function makePatchProfilePic({ updateProfilePic }) {
  return async function patchProfilePic(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const photoFile = httpRequest.file;
    const { uuid } = httpRequest.body;

    console.log(httpRequest);

    try {
      const user = await updateProfilePic({ uuid, photoFile });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update user profile pic successfully',
          data: user,
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
