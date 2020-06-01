'use strict';

const cheerio = require('cheerio');
const axios = require('axios');

module.exports = (usrOptions, callback) => {

  let endpoint = usrOptions.id ? usrOptions.endpoint + '/' + usrOptions.id : usrOptions.endpoint;

  const options = {
    method: 'get',
    url: 'http://eksisozluk.com/' + endpoint,
    transformResponse: body => {
      return cheerio.load(body, {
        normalizeWhitespace: true,
        xmlMode: true
      });
    }
  };

  axios(options)
    .then(res => {
      const {data} = res;
      data.statusCode = res.status;
      callback(data);
    })
    .catch(err => {
      const {data} = err.response;
      data.statusCode = err.response.status;
      callback(data);
    });
};
