const express = require('express');
const authorController = require('../controllers/authorController');
const authorService = require('../services/authorService');


const authorRouter = express.Router();

function router(nav) {
  const { getAuthorList, getAuthorById } = authorController(authorService, nav);

  authorRouter.route('/')
    .get(getAuthorList);

  authorRouter.route('/:id')
    .get(getAuthorById);

  return authorRouter;
}

module.exports = router;
