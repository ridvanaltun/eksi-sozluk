const umlaut = {
  '&apos;': '\'',
  '&#xE7;': 'ç',
  '&#x11F;': 'ğ',
  '&#x131;': 'ı',
  '&#xF6;': 'ö',
  '&#x15F;': 'ş',
  '&#xFC;': 'ü',
  'class="ab"': '', // akıllı bkz
};

module.exports = (text) => {
  const re = new RegExp(Object.keys(umlaut).join('|'), 'gim');

  return text.replace(re, (matched) => {
    return umlaut[matched];
  });
};
