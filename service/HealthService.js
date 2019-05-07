'use strict';


/**
 * Health check for Deposit Solutions service
 * 
 *
 * no response value expected for this operation
 **/
exports.getHealth = function() {
  return new Promise(function(resolve, reject) {
   var examples = {};
    examples['application/json'] = {"status" : "ok"};

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

