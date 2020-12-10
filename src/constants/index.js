const DEFAULTS = {
  TITLE_COUNT_PER_PAGE: 50,
  ENTRY_COUNT_PER_PAGE_OF_PROFILE: 10
}

const URLS = {
  BASE: 'https://eksisozluk.com',
  LOGIN: 'https://eksisozluk.com/giris',
  USER: 'https://eksisozluk.com/biri/',
  SEYLER: 'https://seyler.eksisozluk.com/',
  ENTRY: 'https://eksisozluk.com/entry/',
  ENTRY_CREATE: 'https://eksisozluk.com/entry/ekle',
  ENTRY_VOTE: 'https://eksisozluk.com/entry/vote',
  ENTRY_VOTE_REMOVE: 'https://eksisozluk.com/entry/removevote',
  ENTRY_FAVORITE: 'https://eksisozluk.com/entry/favla',
  ENTRY_UNFAVORITE: 'https://eksisozluk.com/entry/favlama',
  ENTRY_FAVORITED_AUTHORS: 'https://eksisozluk.com/entry/favorileyenler',
  ENTRY_FAVORITED_ROOKIES: 'https://eksisozluk.com/entry/caylakfavorites',
  PIN: 'https://eksisozluk.com/kullanici/add-pin',
  PIN_REMOVE: 'https://eksisozluk.com/kullanici/remove-pin',
  TAGS: 'https://eksisozluk.com/kanallar',
  TRASH: 'https://eksisozluk.com/cop',
  TRASH_EMPTY: 'https://eksisozluk.com/cop/bosalt',
  TRASH_DELETE: 'https://eksisozluk.com/cop/sil',
  TRASH_RECOVER: 'https://eksisozluk.com/cop/canlandir',
  SEARCH: 'https://eksisozluk.com/autocomplete/query',
  USER_LATEST_ENTRIES: 'https://eksisozluk.com/son-entryleri',
  USER_FAVORITED_ENTRIES: 'https://eksisozluk.com/favori-entryleri',
  USER_MOST_FAVORITED_ENTRIES:
    'https://eksisozluk.com/en-cok-favorilenen-entryleri',
  USER_LAST_VOTED_ENTRIES: 'https://eksisozluk.com/son-oylananlari',
  USER_SELF_FAVORITED_ENTRIES: 'https://eksisozluk.com/el-emegi-goz-nuru',
  USER_MOST_LIKED_ENTRIES: 'https://eksisozluk.com/en-begenilenleri',
  USER_IMAGES: 'https://eksisozluk.com/gorselleri',
  USER_FAVORITE_AUTHORS: 'https://eksisozluk.com/favori-yazarlari',
  USER_UKTE: 'https://eksisozluk.com/ukteleri',
  MESSAGE: 'https://eksisozluk.com/mesaj',
  SEND_MESSAGE: 'https://eksisozluk.com/mesaj/yolla',
  FOLLOW_USER: 'https://eksisozluk.com/userrelation/addrelation',
  UNFOLLOW_USER: 'https://eksisozluk.com/userrelation/removerelation',
  BLOCK_USER: 'https://eksisozluk.com/userrelation/addrelation',
  UNBLOCK_USER: 'https://eksisozluk.com/userrelation/removerelation',
  BLOCK_USER_TITLES: 'https://eksisozluk.com/userrelation/addrelation',
  UNBLOCK_USER_TITLES: 'https://eksisozluk.com/userrelation/removerelation',
  SETTINGS_EMAIL: 'https://eksisozluk.com/ayarlar/email',
  SETTINGS_CANCEL_UPDATE_EMAIL:
    'https://eksisozluk.com/ayarlar/cancelopenemailchangerequest',
  SETTINGS_PASSWORD: 'https://eksisozluk.com/ayarlar/sifre',
  SETTINGS_DELETE_ACCOUNT: 'https://eksisozluk.com/ayarlar/kaydi-kapat',
  SETTINGS_CHANGE_USERNAME: 'https://eksisozluk.com/ayarlar/kullanici-adi'
}

module.exports = {
  DEFAULTS,
  URLS
}
