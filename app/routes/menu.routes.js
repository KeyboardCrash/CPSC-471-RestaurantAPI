
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
  const menu = require("../controllers/menu.controller.js");

  app.get("/api/menu", menu.findAll);

  app.get("/api/menu/:menuId", menu.findOne);

};