```javascript
const eksisozluk = require('eksi-sozluk');

eksisozluk
    .getEntryById(1)
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
