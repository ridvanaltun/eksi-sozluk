/**
 * Convert given object to x-www-form-urlencoded
 *
 * @param   {Object}  body  A request body
 *
 * @return  {string}        x-www-form-urlencoded compatible request body
 */
const toEncodeFormUrl = (body) => {
  return Object.keys(body).reduce(
    (p, c) => p + `&${c}=${encodeURIComponent(body[c])}`,
    ''
  )
}

module.exports = toEncodeFormUrl
