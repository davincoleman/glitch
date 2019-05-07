'use strict';

var utils = require('../utils/writer.js');
var Health = require('../service/HealthService');

module.exports.getHealth = function getHealth (req, res, next) {
  Health.getHealth()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
