export default function makeListUserByDocument({ authDb }) {
  return async function listUserByDocument({ document } = {}) {
    if (!document) throw new Error('Document is null');

    const user = await authDb.findByDocumetID(document);
    return user;
  };
}
