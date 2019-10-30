const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authorController');

function authorController(authorService, nav) {
  function getAuthorList(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = db.collection('books');

        const books = await col.find().toArray();

        const newAuthors = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const book of books) {
          const newAuthor = authorService.getAuthorById(book.authId);
          newAuthors.push(newAuthor);
        }

        res.render(
          'authorListView',
          {
            nav,
            title: 'Authors',
            authors: await Promise.all(newAuthors)
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getAuthorById(req, res) {
    const { id } = req.params;

    (async function mongo() {
      try {
        const author = await authorService.getAuthorById(id);
        res.render(
          'authorView',
          {
            nav,
            title: 'Authors',
            author
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  return {
    getAuthorList,
    getAuthorById
  };
}

module.exports = authorController;
