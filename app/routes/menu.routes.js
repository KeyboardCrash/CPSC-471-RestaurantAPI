
// Defines the menu routes that the api will have

module.exports = app => {
  const menu = require("../controllers/menu.controller.js");

  //Create a new menu 
  app.post("/api/menu", menu.create);

  //Add new dish to menu
  app.post("/api/menu/:menuVersionID/addDish", menu.addMenuDish);

  //Find every menu
  app.get("/api/menu", menu.findAll);

  //Find a specific menu by versionID
  app.get("/api/menu/:versionID", menu.findOne);

  //Find dishes associated with a specific menu ID
  app.get("/api/menu/:versionID/dishes", menu.findAllDishes); 

  //Update a menu by versionID
  app.put("/api/menu/:versionID", menu.update);

  //Delete a menu by versionID
  app.delete("/api/menu/:versionID", menu.delete);

};