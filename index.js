const buildErrorMessage = require('./build-error-message');

module.exports = function switchboardPolicy () {
  return function (req, res, next) {
    let route = req._switchboard_route;
    if (route.policy) {
      try {
        route.policy(req, res).then(next)
      } catch (err) {
        buildErrorMessage(err, req);
        throw err;
      }
    } else {
      next();
    }
  }
}