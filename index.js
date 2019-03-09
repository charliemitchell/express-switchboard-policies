module.exports = function (onError) {
  if (!onError || typeof onError !== 'function') {
    throw new Error("an error handler is required to use express-switchboard-policies. You passed in", onError);
  }
  return function (req, res, resolve) {
    try {
      let route = req._switchboard_route;
      if (route.policy) {
        route.policy(req, res, resolve);
      } else {
        resolve();
      }
    } catch (err) {
      onError(err, req, res, resolve);
    }
  }
}
