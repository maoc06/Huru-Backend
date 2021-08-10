export default function makeListQuery({ userDb }) {
  return async function listQuery({ query } = {}) {
    if (!query) throw new Error('query null');

    const res = await userDb.queryUser(query);
    return res;
  };
}
