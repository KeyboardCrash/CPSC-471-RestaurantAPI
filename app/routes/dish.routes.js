// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const dish = require("../controllers/dish.controller.js");
    
      // Create a new Member
      app.post("/dish", dish.create);

      // retrieve a dish by Id
      app.get("/dish/:dishId", dish.findOne);    
      // Retrieve all Members
      app.get("/dish", dish.findAll);

      // Update a dish with name
     app.put("/dish/:dishId", dish.update);   
     
      // Delete a dish with name
     app.delete("/dish/:dishId", dish.delete);     

      // Delete all dishes
     app.delete("/dish", dish.deleteAll);
}; 