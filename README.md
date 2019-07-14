# Express SwitchBoard Policies

[![Build Status](https://travis-ci.org/charliemitchell/express-switchboard-policies.svg?branch=master)](https://travis-ci.org/charliemitchell/express-switchboard-policies) [![Coverage Status](https://coveralls.io/repos/github/charliemitchell/express-switchboard-policies/badge.svg?branch=master)](https://coveralls.io/github/charliemitchell/express-switchboard-policies?branch=master)

This is a plugin for [Express SwitchBoard](https://github.com/charliemitchell/express-switchboard). The purpose of this plugin is help organize authorize policies in a concise way.

Example Usage:

```js
  // policies/access-policies.js
  module.exports = {
    admin (req, res) {

      return new Promise((resolve, reject) => {
        if (req.session.admin === true) {
          resolve();
        } else {
          res.status(403).json({ status: 'nope' });
        }
      });

    }
  }
```

```js
// routes/admin.js
const switchboardPolicyPlugin = require('express-switchboard-policies');
const { admin } = require('../policies/access-policies.js');

module.exports = [
  get: [
    {
      path: '/admin/stuff',
      action: 'getAdminStuff',
      plugins: [ switchboardPolicyPlugin ],
      policy: admin
    }
  ]
];
  
```
