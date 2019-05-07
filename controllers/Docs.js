'use strict';

var utils = require('../utils/writer.js');
var Docs = require('../service/DocsService');

module.exports.getDocs = function getDocs (req, res, next) {
  Docs.getDocs()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
