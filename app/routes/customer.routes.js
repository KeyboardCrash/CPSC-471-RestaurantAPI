
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  // Create a new Customer
  app.post("/api/customers", customers.create);

  // Retrieve all Customers
  app.get("/api/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/api/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/api/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/api/customers/:customerId", customers.delete);

  app.get("/api/customers/:customerId/phone", customers.getPhone);

  app.get("/api/customers/:customerId/address", customers.getAddress);


};