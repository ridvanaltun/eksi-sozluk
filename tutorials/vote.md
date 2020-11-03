```javascript
const eksisozluk = require('eksi-sozluk');

const session = new eksisozluk();

session
    .entryById(1)
    .then(async (entry) => {
      // Upvote
      await entry.upvote();

      // Downvote
      await entry.downvote();
    })
    .catch((err) => {
      console.log(err);
    });
```
