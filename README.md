# Express SwitchBoard Policies

This is a plugin for Express SwitchBoard. The purpose of this plugin is help organize authorize policies in a concise way.

Example Usage:

```js
  // policies/default-policies-conf.js
  const switchboardPolicies = require('express-switchboard-policies');
  const policies = switchboardPolicies( (err, req, res, resolve) => {
    res.status(500).send();
  });
  module.exports = policies;
```

```js
  // policies/access-policies.js
  module.exports = {
    admin (req, res, next) {
      if (req.session.admin === true) {
        next();
      } else {
        res.status(403).json({status: 'nope'})
      }
    }
  }
```

```js
// routes/admin.js

const switchboardPolicies = require('../policies/default-policies-conf.js');
const { admin } = require('../policies/access-policies.js');

module.exports = [
  get: [
    {
      path: '/admin/stuff',
      action: 'getAdminStuff',
      plugins: [ switchboardPolicies ],
      policy: admin
    }
  ]
];
  
```
