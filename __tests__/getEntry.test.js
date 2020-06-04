const eksisozluk = require('../index');

describe('Entry Test', () => {
  test('Getting Entry By Id', () => {
    return eksisozluk.getEntryById(1)
        .then((data) => {
          expect(data.author).toBe('ssg');
          expect(data.author_id).toBe(8097);
          expect(data.author_url).toBe('https://eksisozluk.com/biri/ssg');
          expect(data.content).toBe(' gitar calmak icin kullanilan minik plastik garip nesne. ');
          expect(data.content_encoded).toBe('gitar calmak icin kullanilan minik plastik garip nesne.');
          expect(data.date_created).toBe('1999-02-15T00:00:00+02:00');
          expect(data.date_modified).toBe(null);
          expect(data.eksiseyler_link).toBe('https://seyler.eksisozluk.com/20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi');
          expect(data.eksiseyler_slug).toBe('20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi');
          expect(data.entry_id).toBe(1);
          expect(typeof data.favorite_count).toBe('number');
          expect(data.permalink).toBe('https://eksisozluk.com/entry/1');
          expect(data.title).toBe('pena');
          expect(data.title_id).toBe(31782);
          expect(data.title_slug).toBe('pena');
          expect(data.title_url).toBe('https://eksisozluk.com/pena--31782');
        });
  });
});
