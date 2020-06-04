const eksisozluk = require('../index');

describe('User Test', () => {
  test('Getting User', () => {
    return eksisozluk.getUser('ssg')
        .then((data) => {
          expect(data.username).toBe('ssg');
          expect(data.user_url).toBe('https://eksisozluk.com/biri/ssg');
          expect(typeof data.user_badge_points).toBe('number');
          expect(typeof data.entry_count_total).toBe('number');
          expect(typeof data.entry_count_lastmonth).toBe('number');
          expect(typeof data.entry_count_lastweek).toBe('number');
          expect(typeof data.entry_count_today).toBe('number');
        });
  });
});
