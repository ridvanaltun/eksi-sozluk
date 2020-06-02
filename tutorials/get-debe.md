```javascript
const eksisozluk = require('eksi-sozluk');

const options = {
  limit: 5,
};

eksisozluk.getDebe(options, (result) => {
  console.log(result);
});
```

### Result

```json
{
  status: 200,
  data: [
    {
      title: 'rotator cuff',
      url: 'https://eksisozluk.com/entry/108174970'
    },
    {
      title: 'rota',
      url: 'https://eksisozluk.com/entry/108166843'
    },
    {
      title: 'avusturya',
      url: 'https://eksisozluk.com/entry/108176048'
    },
    {
      title: 'taha duymaz',
      url: 'https://eksisozluk.com/entry/108158865'
    },
    {
      title: "yunanistan'ın türkiye sınırına çin seddi yapması",
      url: 'https://eksisozluk.com/entry/108194112'
    }
  ]
}
```
