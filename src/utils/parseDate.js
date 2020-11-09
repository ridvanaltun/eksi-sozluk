const moment = require('moment')

const regexes = [
  /((\d{2}\.){2}\d{4})/,
  /((\d{2}\.){2}\d{4}\s\d{2}:\d{2})/,
  /((\d{2}\.){2}\d{4}\s\d{2}:\d{2}\s~\s\d{2}:\d{2})/,
  /(((\d{2}\.){2}\d{4}\s\d{2}:\d{2})\s~\s((\d{2}\.){2}\d{4}\s\d{2}:\d{2}))/
]

/**
 * Parse given date string
 * @param   {string}                                    date  Ex. 08.06.2016 13:59 ~ 31.08.2016 08:50
 * @return  {{created: string, modified: string|null}}        Parsed date.
 */
const parseDate = (date) => {
  // localize moment
  moment.locale('tr')

  const modified = date.indexOf(' ~ ') > 0

  let level = 0
  regexes.forEach((regex) => {
    if (regex.test(date)) {
      level = regexes.indexOf(regex)
    }
  })

  const d = {}
  if (level === 0) {
    d.created = moment(date + ' 00:00:00', 'DD.MM.YYYY HH:mm:ss').format().toString()
    d.modified = null
  } else if (level === 1) {
    d.created = moment(date + ':00', 'DD.MM.YYYY HH:mm:ss').format().toString()
    d.modified = null
  } else if (level === 2 && modified) {
    d.created = moment(date.split(' ~ ')[0] + ':00', 'DD.MM.YYYY HH:mm:ss').format().toString()
    d.modified = moment(date.split(' ~ ')[0] + ' ' + date.split(' ~ ')[1] + ':00', 'DD.MM.YYYY HH:mm:ss').format().toString()
  } else if (level === 3 && modified) {
    d.created = moment(date.split(' ~ ')[0] + ':00', 'DD.MM.YYYY HH:mm:ss').format().toString()
    d.modified = moment(date.split(' ~ ')[1] + ':00', 'DD.MM.YYYY HH:mm:ss').format().toString()
  }

  return d
}

module.exports = parseDate
