var assert = require('chai').assert;
var plugin = require('../index');

describe('Errors', () => {

  it('makes it clear that a promise must be returned', function () {

    let pluginMethod = plugin();
    const request = {
      originalUrl: '/posts/88764',
      _switchboard_route: {
        policy () { return true; }
      }
    };

    assert.throws(() => {
      pluginMethod(request, {}, function () {});
    }, Error, 'There was an error implementing a switchboard policy.\nURL: /posts/88764.\nError Detection: Your policy must return a promise. Did you return a promise?\n\nOriginal Error:\nroute.policy(...).then is not a function');
  });

  it('propagates an error', function () {

    let pluginMethod = plugin();
    const request = {
      originalUrl: '/posts/88764',
      _switchboard_route: {
        policy () {
          let isError = {};
          isError.undef();
        }
      }
    };

    assert.throws(() => {
      pluginMethod(request, {}, function () {});
    }, Error, 'There was an error implementing a switchboard policy.\nURL: /posts/88764.\nError Detection: N/A\n\nOriginal Error:\nisError.undef is not a function');
  });
});


describe('Policies', () => {

  it('invokes the callback when there is no policy', () => {
    let invoked = false;
    let pluginMethod = plugin();
    pluginMethod({ _switchboard_route: {} }, {}, function () { invoked = true; });
    assert.equal(invoked, true);
  });

  it('invokes the policy when there is a policy', () => {
    let invoked = false;
    const request = {
      _switchboard_route: {
        policy () { invoked = true; return Promise.resolve(); }
      }
    };
    let pluginMethod = plugin(err => {});
    pluginMethod(request, {}, function () { });
    assert.equal(invoked, true);
  });

  it('passes the correct arguments to the policy', () => {
    const response = { };
    let pluginMethod = plugin();
    const request = {
      _switchboard_route: {
        policy (req, res) {
          req.isReq = true;
          res.isResponse = true;
          return Promise.resolve();
        }
      }
    };

    pluginMethod(request, response);
    assert.equal(request.isReq, true);
    assert.equal(response.isResponse, true);
  });

});
