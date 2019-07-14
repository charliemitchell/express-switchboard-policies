# Express SwitchBoard Policies

This is a plugin for Express SwitchBoard. The purpose of this plugin is help organize authorize policies in a concise way.

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
          reject();
        }
      });

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
