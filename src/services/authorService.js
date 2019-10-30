const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:authorService');

const parser = xml2js.Parser({ explicitArray: false });

function authorService() {
  function getAuthorById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/author/show/${id}.xml?key=XwkXuJ6tci5BFWuAkRg1w`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              resolve(result.GoodreadsResponse.author);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getAuthorById };
}

module.exports = authorService();
