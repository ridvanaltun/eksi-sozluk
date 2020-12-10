/**
 * @typedef {number} TitleType
 **/

/**
 * Title types.
 *
 * @enum {TitleType}
 */
const TITLE_TYPES = {
  TITLE: 1,
  DRAFT: 2,
  FOLLOWED_USER: 3,
  FOLLOWED_USER_FAVORITE_ENTRY: 4,
  QUESTION: 5
}

/**
 * @typedef {string} TagName
 **/

/**
 * Tag names.
 *
 * @enum {TagName}
 */
const TAGS = {
  SPOR: 'spor',
  ILISKILER: 'iliskiler',
  SIYASET: 'siyaset',
  SEYAHAT: 'seyahat',
  MUZIK: 'muzik',
  TV: 'tv',
  HABER: 'haber',
  BILIM: 'bilim',
  EDEBIYAT: 'edebiyat',
  EGITIM: 'egitim',
  EKONOMI: 'ekonomi',
  TROLL: 'troll',
  HAVACILIK: 'havacilik',
  PROGRAMLAMA: 'programlama',
  ANKET: 'anket',
  OYUN: 'oyun',
  SAGLIK: 'saglik',
  MOTOSIKLET: 'motosiklet',
  EKSI_SOZLUK: 'eksi-sozluk',
  MAGAZIN: 'magazin',
  OTOMOTIV: 'otomotiv',
  MODA: 'moda',
  SANAT: 'sanat',
  TEKNOLOJI: 'teknoloji',
  TARIH: 'tarih',
  YEME_ICME: 'yeme-icme',
  SPOILER: 'spoiler',
  SINEMA: 'sinema'
}

/**
 * @typedef {string} CollectionType
 **/

/**
 * Entry sorting or filtering types.
 *
 * @enum {CollectionType}
 */
const COLLECTION_TYPES = {
  NICE: 'nice',
  DAILY_NICE: 'dailynice',
  ROOKIES: 'caylaklar',
  EKSI_SEYLER: 'eksiseyler',
  IMAGES: 'gorseller',
  LINKS: 'links',
  AUTHOR: 'author', // search author
  BUDDY: 'buddy',
  FIND: 'find'
}

module.exports = {
  TITLE_TYPES,
  TAGS,
  COLLECTION_TYPES
}
