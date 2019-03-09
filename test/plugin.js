var assert = require('assert');
var plugin = require('../index');

const requestWithNoPolicy = { __switchboard_route: {} };

const requestWithPolicyError = { 
  __switchboard_route: { 
    policy () { throw new Error() }
  }
};

const requestWithNoPolicyError = { 
  __switchboard_route: { 
    policy () { }
  }
};

describe('Error handler', () => {
  
  it('requires an error handler', () => {
    assert.throws(() => {
      plugin();
    });
  });

  it('does not throw when an error handler is required', () => {
    assert.doesNotThrow(() => {
      plugin(() => {});
    });
  });

  it('calls the error handler when there is an error', () => {
    let error = false;
    let pluginmethod = plugin(err => { error = true });
    pluginmethod(requestWithPolicyError, {}, function () {});
    assert.equal(error, true);
  });

  it('does not call the error handler when there is no error', () => {
    let error = false;
    let pluginmethod = plugin(err => { error = true;});
    pluginmethod(requestWithNoPolicyError, {}, function () {});
    assert.equal(error, false);
  });

});


describe('Policies', () => {

  it('invokes the callback when there is no policy', () => {
    let invoked = false;
    let pluginmethod = plugin(err => {});
    pluginmethod(requestWithNoPolicy, {}, function () { invoked = true; });
    assert.equal(invoked, true);
  });

  it('invokes the policy when there is a policy', () => {
    let invoked = false;
    const request = { 
      __switchboard_route: { 
        policy () { invoked = true }
      }
    };
    let pluginmethod = plugin(err => {});
    pluginmethod(request, {}, function () { });
    assert.equal(invoked, true);
  });

  it('passes the correct arguments to the policy', () => {
    let invokedCallback = false;
    const callback = function () { invokedCallback = true };
    let pluginmethod = plugin(err => {});
    const response = { };
    const request = {
      __switchboard_route: { 
        policy (req, res, next) {
          req.isReq = true;
          res.isResponse = true;
          next();
        }
      }
    };
    
    pluginmethod(request, response, callback);
    assert.equal(request.isReq, true);
    assert.equal(response.isResponse, true);
    assert.equal(invokedCallback, true);
  });

});
