/**
 * Collection base
 */
class CollectionBase {
  /**
   * Current page.
   *
   * @type {number}
   */
  currPage

  /**
   * Total page count.
   *
   * @type {number}
   */
  pageCount

  /**
   * Retrieve first page.
   */
  async first() {
    this.currPage = 1
    await this.retrieve()
  }

  /**
   * Retrieve last page.
   */
  async last() {
    this.currPage = this.pageCount
    await this.retrieve()
  }

  /**
   * Retrieve next page.
   */
  async next() {
    const isLastPage = this.currPage === this.pageCount

    if (isLastPage) {
      throw new Error('There is no page left.')
    }

    this.currPage += 1
    await this.retrieve()
  }

  /**
   * Retrieve previous page.
   */
  async prev() {
    const isFirstPage = this.currPage === 1

    if (isFirstPage) {
      throw new Error('There is no page left.')
    }

    this.currPage -= 1
    await this.retrieve()
  }
}

module.exports = CollectionBase
