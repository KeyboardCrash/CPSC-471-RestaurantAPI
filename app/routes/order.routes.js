
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const order = require("../controllers/order.controller.js");

      // create an order
      app.post("/api/order", order.createOrder);    

      // Retrieve all orders
      app.get("/api/order", order.findAll);

      // Retrieve a single order by orderNo
      app.get("/api/order/:orderNo", order.findOne);

      // Retrieve all orders of a customer with customerId
      app.get("/api/order/customer/:customerId", order.getOrdersByCustomer);

      // add an entry to the list of dish orders of an order
      app.post("/api/order/list/:orderNo", order.addDishOrder);     
      
      // delete a dish from the list of dish orders for an order
      app.delete("/api/order/list/:orderNo", order.delDishOrder);
};