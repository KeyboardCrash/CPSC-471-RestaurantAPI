
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
  const branch = require("../controllers/branch.controller.js");

  // Define the paths used by branch

  app.get("/api/branch", branch.findAll);

  app.get("/api/branch/:branchId", branch.findOne);

  app.get("/api/branch/:branchId/information", branch.getBranchInfo);

  app.get("/api/branch/:branchId/information/revenue", branch.getBranchRevenue);

  app.get("/api/branch/:branchId/information/revenue/summary", branch.getBranchRevenueTotal);

  app.get("/api/branch/:branchId/employees", branch.getBranchEmployees);

  app.get("/api/branch/:branchId/employees/manager", branch.getBranchManager);


};