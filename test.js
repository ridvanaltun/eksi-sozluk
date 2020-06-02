const eksisozluk = require('./index.js');
const expect = require('expect.js');

describe('Entry Test', () => {
  it('Entry By Id Test', () => {
    return eksisozluk.getEntryById(1, (result) => {
      expect(result).to.be.an('object');
      expect(result.status).to.eql(200);
      expect(result.data.author).to.eql('ssg');
      expect(result.data.author_id).to.eql(8097);
      expect(result.data.author_url).to.eql('https://eksisozluk.com/biri/ssg');
      expect(result.data.content).to.eql(' gitar calmak icin kullanilan minik plastik garip nesne. ');
      expect(result.data.content_encoded).to.eql('gitar calmak icin kullanilan minik plastik garip nesne.');
      expect(result.data.date_created).to.eql('1999-02-15T00:00:00+02:00');
      expect(result.data.date_modified).to.eql(null);
      expect(result.data.eksiseyler_link).to.eql('https://seyler.eksisozluk.com/20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi');
      expect(result.data.eksiseyler_slug).to.eql('20-yil-once-bugun-girilen-eksi-sozlukun-ilk-entrysi-pena-nin-hikayesi');
      expect(result.data.entry_id).to.eql(1);
      expect(result.data.favorite_count).to.be.an('number');
      expect(result.data.permalink).to.eql('https://eksisozluk.com/entry/1');
      expect(result.data.title).to.eql('pena');
      expect(result.data.title_id).to.eql(31782);
      expect(result.data.title_slug).to.eql('pena');
      expect(result.data.title_url).to.eql('https://eksisozluk.com/pena--31782');
    });
  });
  it('Entries Test', () => {
    return eksisozluk.getEntries('pena', {page: 1}, (result) => {
      expect(result).to.be.an('object');
      expect(result.status).to.eql(200);
      expect(result.data.length).to.eql(11);
      expect(result.data[0].author).to.eql('ssg');
      expect(result.data[0].author_id).to.eql(8097);
      expect(result.data[0].author_url).to.eql('https://eksisozluk.com/biri/ssg');
      expect(result.data[0].content).to.eql(' gitar calmak icin kullanilan minik plastik garip nesne. ');
      expect(result.data[0].content_encoded).to.eql('gitar calmak icin kullanilan minik plastik garip nesne.');
      expect(result.data[0].date_created).to.eql('1999-02-15T00:00:00+02:00');
      expect(result.data[0].date_modified).to.eql(null);
      expect(result.data[0].eksiseyler_link).to.eql('https://seyler.eksisozluk.com/pena');
      expect(result.data[0].eksiseyler_slug).to.eql('pena');
      expect(result.data[0].entry_id).to.eql(1);
      expect(result.data[0].favorite_count).to.be.an('number');
      expect(result.data[0].permalink).to.eql('https://eksisozluk.com/entry/1');
      expect(result.data[0].title).to.eql('pena');
      expect(result.data[0].title_id).to.eql(31782);
      expect(result.data[0].title_slug).to.eql('pena');
      expect(result.data[0].title_url).to.eql('https://eksisozluk.com/pena--31782');
    });
  });
});

describe('Title Test', () => {
  it('Debe Test', () => {
    return eksisozluk.getDebe({limit: 5}, (result) => {
      expect(result).to.be.an('object');
      expect(result.status).to.eql(200);
      expect(result.data.length).to.eql(5);
    });
  });
  it('Today in History Test', () => {
    return eksisozluk.getTodayInHistory('2018', {page: 1}, (result) => {
      expect(result).to.be.an('object');
      expect(result.status).to.eql(200);
      expect(result.data.length).to.eql(50);
    });
  });
});

describe('User Test', () => {
  it('User Test', () => {
    return eksisozluk.getUser('ssg', (result) => {
      expect(result).to.be.an('object');
      expect(result.status).to.eql(200);
      expect(result.data.username).to.eql('ssg');
      expect(result.data.user_url).to.eql('https://eksisozluk.com/biri/ssg');
      expect(result.data.user_badge_points).to.be.an('number');
      expect(result.data.entry_count_total).to.be.an('number');
      expect(result.data.entry_count_lastmonth).to.be.an('number');
      expect(result.data.entry_count_lastweek).to.be.an('number');
      expect(result.data.entry_count_today).to.be.an('number');
    });
  });
});
