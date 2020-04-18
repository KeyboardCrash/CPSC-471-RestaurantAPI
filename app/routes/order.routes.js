
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const order = require("../controllers/order.controller.js");

      // create an order
      app.post("/api/order", order.createOrder);    

      // add an entry to the list of dish orders of an order
      app.post("/api/order/list/:orderNo", order.addDishOrder);           

      // Retrieve all orders
      app.get("/api/order", order.findAll);

      // Retrieve a single order by orderNo
      app.get("/api/order/:orderNo", order.findOne);

      // Retrieve all orders of a customer with customerId
      app.get("/api/order/customer/:customerId", order.getOrdersByCustomer);

      // update an order with the given order number
      app.put("/api/order/:orderNo", order.updateOrder);

      // edit the quantity of a dish from the list of orders of an order
      app.put("/api/order/list/:orderNo", order.editDishOrder);      
      
      // delete a dish from the list of dish orders for an order
      app.delete("/api/order/list/:orderNo", order.delDishOrder);

      // delete an order from the database
      app.delete("/api/order/:orderNo", order.delOrder);

      // delete all orders of a customer given the customer id
      app.delete("/api/order/customer/:customerId", order.delCustomerOrders);
};