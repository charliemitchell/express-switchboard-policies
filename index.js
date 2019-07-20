const buildErrorMessage = require('./build-error-message');

module.exports = function switchboardPolicy () {
  return function (req, res) {
    let route = req._switchboard_route;
    if (route.policy) {
      return route.policy(req, res);
    } else {
      return Promise.resolve();
    }
  }
}
