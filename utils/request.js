'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

module.exports = (endpoint, callback) => {
  const options = {
    method: 'get',
    url: encodeURI('http://eksisozluk.com' + endpoint),
    transformResponse: (body) => {
      return cheerio.load(body, {
        normalizeWhitespace: true,
        xmlMode: true,
      });
    },
  };

  axios(options)
      .then((res) => {
        const {data} = res;
        data.statusCode = res.status;
        callback(data);
      })
      .catch((err) => {
        const {data} = err.response;
        data.statusCode = err.response.status;
        callback(data);
      });
};
