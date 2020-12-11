**NOTE:** You must to login before proceed handling account. Guest sessions not will work.

```javascript
// change password
// the old token will be invalid and the token automatically will change
await session.changePassword('<current-password>', '<new-password>');

// change email address
await session.changeEmailAddress('<current-email>', '<new-email>', '<current-password>');

// check out is your email changing status
// returns true or false
const isEmailAddressInChangeStatus = await session.isEmailAddressInChangeStatus();
console.log(isEmailAddressInChangeStatus);

// cancel email change
await session.cancelEmailAddressChange();

// change login username
await session.changeLoginUsername('<new-login-username>', '<current-password>');
```

### Create Backup

You can create a backup on every 5 minutes.

```javascript
const {EksiSozluk} = require("eksi-sozluk");
const fs = require('fs');

const main = async () => {
  const eksi = new EksiSozluk({
    httpClient: {
      timeout: 10000
    }
  });

  // login
  const session = await eksi.loginWithToken('<your-secret-token>');

  // create a backup
  const backup = await session.createBackup();

  // save the backup
  fs.writeFile('./mybackup.zip', backup, err => {
    if (err) {
      console.log(err);
    }
  });
}
```
