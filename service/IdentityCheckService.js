'use strict';

const uuid = require('uuid/v1');

var custChecks = {};

/**
 * Start a new IdentityCheck
 * Deposit Solution will initiate the check. Information about the customer is provided by Deposit Solutions when the call is made. Tandem will record this information and return a check ID. Deposit Solution can monitor the progress of the check using the URL in the Location header. Tandem will use the callback URL to inform Deposit Solution that the check is complete. 
 *
 * body IdentityCheckRequest Customer reference, profile and callbackUri
 * returns IdentityCheckResponse
 **/
exports.createIdentityCheck = function(body) {
  return new Promise(function(resolve, reject) {
    
    let now = new Date();
    const id = body.customerReference;
    
    // see if customer check previous
    const prevCheck = custChecks[id];
    var createdTime = now.toISOString();
    var checkId = uuid();
    if (prevCheck) {
      createdTime = prevCheck.createdOn;
      checkId = prevCheck.id;
    } else {
      body.createdOn = createdTime;
      body.id = checkId;
      custChecks[id] = body;
    }
    
    var response = {
//  "duplicatedCustomerReference" : "duplicatedCustomerReference",
//  "duplicatedIdentityId" : "duplicatedIdentityId",
  // "identity" : {
  //   "id" : "id"
  // },
  "customerReference" : id,
  // "decline" : {
  //   "code" : "code"
  // },
  "id" : checkId,
  // "error" : {
  //   "code" : "code",
  //   "message" : "message"
  // },
  "createdOn" : createdTime,
  "status" : "Processing"
    };
    
    var examples = {};
    examples['application/json'] = response;
      
    if (Object.keys(examples).length > 0) {
      resolve({body: examples[Object.keys(examples)[0]], status: prevCheck ? 200 : 201});
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
exports.getIdentityCheckById = function(identityCheckId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "duplicatedCustomerReference" : "duplicatedCustomerReference",
  "duplicatedIdentityId" : "duplicatedIdentityId",
  "identity" : {
    "id" : "id"
  },
  "customerReference" : "customerReference",
  "decline" : {
    "code" : "code"
  },
  "id" : "identityCheckId",
  "error" : {
    "code" : "code",
    "message" : "message"
  },
  "createdOn" : "2000-01-23",
  "status" : "Processing"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

