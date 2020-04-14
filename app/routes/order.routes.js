
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const order = require("../controllers/order.controller.js");

      // create an order
      app.post("/order", order.createOrder);    

      // Retrieve all orders
      app.get("/order", order.findAll);

      // Retrieve a single order by orderNo
      app.get("/order/:orderNo", order.findOne);

      // Retrieve all orders of a customer with customerId
      app.get("/order/customer/:customerId", order.getOrdersByCustomer);

      // see the list of dish orders in an order
      app.get("/order/list/:orderNo", order.getDishOrder);

      // add an entry to the list of dish orders of an order
      app.post("/order/list/:orderNo", order.addDishOrder);     
      
      // delete a dish from the list of dish orders for an order
      app.delete("/order/list/:orderNo", order.delDishOrder);
};