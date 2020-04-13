
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
  const branch = require("../controllers/branch.controller.js");

  app.get("/api/branch", branch.findAll);

  app.get("/api/branch/:branchId", branch.findOne);

};