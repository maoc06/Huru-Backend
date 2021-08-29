export default function makeDeleteCarReviews({ destroyCarReview }) {
  return async function deleteCarReview(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { id } = httpRequest.params;

    try {
      await destroyCarReview({ id });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Delete car review successfully',
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
