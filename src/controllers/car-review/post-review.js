export default function makePostReview({ addCarReview }) {
  return async function postReview(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...reviewInfo } = httpRequest.body;
      const review = await addCarReview({ ...reviewInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car review successfully added',
          data: review,
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
