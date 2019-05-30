'use strict';

const { NODE_ENV } = require('../config');

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(error, req, res, next) {
  const response = (NODE_ENV === 'production')
    ? { error: 'Server error' }
    // eslint-disable-next-line no-console
    : (console.error(error), { error: error.message, details: error });

  res.status(500).json(response);
};
