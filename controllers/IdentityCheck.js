'use strict'; 

var utils = require('../utils/writer.js');
var IdentityCheck = require('../service/IdentityCheckService');

module.exports.createIdentityCheck = function createIdentityCheck (req, res, next) {
  var body = req.swagger.params['body'].value;
  IdentityCheck.createIdentityCheck(body)
    .then(function (response) {
      console.log(response);
      if (response.status == 201) res.setHeader('Location', 'identity-check/' + response.id);
      utils.writeJson(res, response.body, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getIdentityCheckById = function getIdentityCheckById (req, res, next) {
  var identityCheckId = req.swagger.params['identityCheckId'].value;
  IdentityCheck.getIdentityCheckById(identityCheckId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
