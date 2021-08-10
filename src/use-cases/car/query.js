export default function makeListQuery({ carDb }) {
  return async function listQuery({ query } = {}) {
    if (!query) throw new Error('query null');

    const res = await carDb.queryCar(query);
    return res;
  };
}
