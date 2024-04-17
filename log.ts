export const log = (list) => async (rq, rs) => {
  await list(rq, rs);
  console.log(`${rq.method} ${rq.url} ${rq.statusCode}`);
};

export const logUpgr = (list) => async (rq, s, h) => {
  await list(rq, s, h);
  console.log(`${rq.method} ${rq.url} ${rq.headers.upgrade}`);
};