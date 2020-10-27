```javascript
const eksisozluk = require('eksi-sozluk');

eksisozluk
    .getEntryById(1)
    .then((entry) => {
      console.log(entry);
    })
    .catch((err) => {
      console.log(err);
    });
```

### Result

```json
{
  author: 'ssg',
  author_id: 8097,
  author_url: 'https://eksisozluk.com/biri/ssg',
  content: ' gitar calmak icin kullanilan minik plastik garip nesne. ',
  content_encoded: 'gitar calmak icin kullanilan minik plastik garip nesne.',
  date_created: '1999-02-15T00:00:00+02:00',
  date_modified: null,
  eksiseyler_link: 'https://seyler.eksisozluk.com/20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi',
  eksiseyler_slug: '20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi',
  entry_id: 1,
  favorite_count: 11378,
  permalink: 'https://eksisozluk.com/entry/1',
  title: 'pena',
  title_id: 31782,
  title_slug: 'pena',
  title_url: 'https://eksisozluk.com/pena--31782',
  upvote: [Function: upvote],
  downvote: [Function: downvote]
}
```
