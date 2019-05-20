'use strict';
var service = require('../service');


module.exports = function (app) {
  
  app.get('/listing/createUser', services.createUser);

};
