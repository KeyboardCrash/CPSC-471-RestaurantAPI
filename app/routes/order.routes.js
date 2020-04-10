
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const order = require("../controllers/order.controller.js");
    

      // Retrieve all orders of a customer with customerId
      app.get("/order/customer/:customerId", order.getOrdersByCustomer);
};