```javascript
const { EksiSozluk } = require('eksi-sozluk');

const main = async () => {
  // create session
  const session = new EksiSozluk();

  // login with cookies
  await session.loginWithCookies('<YOUR-SECRET-COOKIES>');

  // get entry
  session
    .entryById(1)
    .then(async (entry) => {
      // Upvote
      await entry.upvote();

      // Downvote
      await entry.downvote();

      // Remove given vote
      await entry.removevote();
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
```
