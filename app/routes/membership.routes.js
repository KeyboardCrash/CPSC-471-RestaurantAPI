// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const members = require("../controllers/membership.controller.js");
    
      // Create a new Customer
      //app.post("/customers", customers.create);
    
      // Retrieve all Members
      app.get("/membership", members.findAll);
    
      // Retrieve a single Customer with customerId
     // app.get("/customers/:customerId", customers.findOne);
    
      // Update a Customer with customerId
     // app.put("/customers/:customerId", customers.update);
    
      // Delete a Customer with customerId
     // app.delete("/customers/:customerId", customers.delete);
    
      // Create a new Customer
     // app.delete("/customers", customers.deleteAll);
    };