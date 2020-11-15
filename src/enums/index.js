'use strict'

/**
 * @typedef {number} TitleType
 **/

/**
 * Title types.
 * @readonly
 * @enum {TitleType}
 */
const TITLE_TYPES = {
  TITLE: 1,
  DRAFT: 2,
  FOLLOWED_USER: 3,
  FOLLOWED_USER_FAVORITE_ENTRY: 4
}

/**
 * @typedef {string} TagName
 **/

/**
 * Tag names.
 * @readonly
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

module.exports = {
  TITLE_TYPES,
  TAGS
}
