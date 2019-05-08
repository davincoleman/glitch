'use strict';

const uuid = require('uuid/v4');

var custChecks = {};
var custIdChecks = {};


/**
 * Start a new IdentityCheck
 * Deposit Solution will initiate the check. Information about the customer is provided by Deposit Solutions when the call is made. Tandem will record this information and return a check ID. Deposit Solution can monitor the progress of the check using the URL in the Location header. Tandem will use the callback URL to inform Deposit Solution that the check is complete. 
 *
 * body IdentityCheckRequest Customer reference, profile and callbackUri
 * returns IdentityCheckResponse
 **/
exports.createIdentityCheck = function(body, headers) {
  return new Promise(function(resolve, reject) {
    
    const custId = body.customerReference;
    const testHeader = headers['x-test'];
    
    if (testHeader && testHeader.toLowerCase('reset')) {
      return resolve ({body: {status: 'reset'}, status: 205});
    }
    
    // see if customer check previous
    const prevCheck = custIdChecks[custId];
    if (prevCheck) {
      const response = custChecks[prevCheck.checkId];
      if (response) return resolve ({body: response, status: 200});
    }
    
    var checkId = uuid();
    body.checkId = checkId;
    custIdChecks[custId] = body;

    let now = new Date();
    var createdTime = now.toISOString();

    var response = {
      "customerReference" : custId,
      "id" : checkId,
      "createdOn" : createdTime,
      "status" : "Processing"
    };
    // save the check context
    custChecks[checkId] = response;
      
    if (response) {
      resolve({body: response, status: prevCheck ? 200 : 201});
    } else {
      resolve();
    }
  });
}


/**
 * Find Identity Check by Id
 * 
 *
 * identityCheckId String IdentityCheck Id
 * returns IdentityCheckResponse
 **/
exports.getIdentityCheckById = function(identityCheckId, headers) {
  return new Promise(function(resolve, reject) {

    const testHeader = headers['x-test'];
    // see if customer check previous
    const check = custChecks[identityCheckId];
    if (!check) return resolve({body: {error: 'check[' + identityCheckId + '] not found'}, status: 404});

    if (testHeader && check.status == 'Processing') {
      if (testHeader.toLowerCase() == 'accepted') {
        check.status = 'Accepted';
        check.identity = {id: uuid()};
      }
      if (testHeader.toLowerCase() == 'declined') {
        check.status = 'Declined';
        check.decline = {code: 'TANDEM-01'};
      }
      if (testHeader.toLowerCase() == 'errored') {
        check.status = 'Error';
        check.error = {code: 'ERR-01', message: 'Tandem Error Message'};
      }
      if (testHeader.toLowerCase() == 'duplicated') {
        const dupCust = custChecks[Object.keys(custChecks)[0]];
        check.duplicatedCustomerReference = dupCust.customerReference;
        check.duplicatedIdentityId = dupCust.identity.id;
        check.status = dupCust.status;
      }
    }
    
    if (check) {
      resolve({body: check, status: 200});
    } else {
      resolve();
    }
  });
}

