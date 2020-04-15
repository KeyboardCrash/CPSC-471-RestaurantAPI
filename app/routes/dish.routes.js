// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const dish = require("../controllers/dish.controller.js");
    
      // Create a new dish
      app.post("/api/dish", dish.create);

      // retrieve a dish by Id
      app.get("/api/dish/:dishId", dish.findOne);    

      // Retrieve all dishes in the database
      app.get("/api/dish", dish.findAll);

      // Update a dish with id
     app.put("/api/dish/:dishId", dish.update);   
     
      // Delete a dish with id
     app.delete("/api/dish/:dishId", dish.delete);     

      // Delete all dishes
     app.delete("/api/dish", dish.deleteAll);
}; 