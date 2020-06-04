```javascript
const eksisozluk = require('eksi-sozluk');

eksisozluk
    .getUser('ssg')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
```

### Result

```json
{
  username: 'ssg',
  user_url: 'https://eksisozluk.com/biri/ssg',
  user_badges: [
    {
      name: 'azimli',
      description: 'en az 1000 entry girmiş'
    },
    {
      name: 'tasnifçi',
      description: 'en az 1000 kanal önerisi yapmış'
    },
    {
      name: 'mangal yürekli rişar',
      description: null
    }
  ],
  user_badge_points: 525,
  entry_count_total: 49636,
  entry_count_lastmonth: 61,
  entry_count_lastweek: 19,
  entry_count_today: 1,
  last_entry_time: 'bugün'
}
```
