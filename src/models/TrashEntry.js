const EntryForMember = require('./EntryForMember')

/**
 * Trash entry.
 *
 * @augments EntryForMember
 */
class TrashEntry extends EntryForMember {
  /**
   * Is modify required?
   *
   * @type  {boolean}
   */
  isModifyRequired

  /**
   * Is deleted from Eksi Sozluk?
   *
   * @type  {boolean}
   */
  isDeletedFromEksisozluk

  /**
   * When entry trashed.
   *
   * @type  {string}
   */
  dateTrashed

  /**
   * Extend trash properties with given document.
   *
   * @param   {object}  $     Cheerio document.
   * @param   {object}  elm   Cheerio element.
   * @ignore
   */
  extendTrashProps($, elm) {
    this.isModifyRequired = $(elm)
      .find('.delete-info')
      .text()
      .includes('düzeltmeniz şart')
    this.isDeletedFromEksisozluk =
      $(elm).find('h2 span a').text() === '@ekşisözlük'
    this.dateTrashed = $(elm).find('time').attr('datetime')
  }
}

module.exports = TrashEntry
