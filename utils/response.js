const ok = (res, message, payload = {}) =>
  res.json({ status: '1', message, payload });

const fail = (res, message, payload = {}) =>
  res.json({ status: '0', message, payload });

module.exports = { ok, fail };
