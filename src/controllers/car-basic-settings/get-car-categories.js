export default function makeGetCarCategories({ listCarCategories }) {
  return async function getCarCategories() {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const categories = await listCarCategories();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of categories',
          data: categories,
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
