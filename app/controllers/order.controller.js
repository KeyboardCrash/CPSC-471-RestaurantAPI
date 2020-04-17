// controller will call methods from the model to call queries
const Order = require("../models/order.model.js");

// creates an order for a customer
exports.createOrder = (req, res) => {
      // Validate request
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
      } else {

            console.log(req.body.date)
            // Save Order to the database
            Order.create(req.body, (err, data) => {
                  if (err) {
                        if (err.kind == "not_found") {
                              res.status(404).send({ error: `customer with id ${req.body.customerId} does not exist`})
                        } else if (err.kind == "bad_date") {
                              res.status(400).send({error: "Invalid date format received"})
                        } else if (err.kind == "bad_orderType") {
                              res.status(400).send({error: "Acceptable values of orderType are only: IN_RESTAURANT, ONLINE, MOBILE"})                             
                        } else {
                              res.status(500).send({ error: err.sqlMessage });
                        }
                  } else res.send({"orderCreated": data});
            });
      }
};

// adds a dish from the list of dish orders for an order
exports.addDishOrder = (req, res) => {
      // Validate request, the dishId and specified quantity must not be null and quantity must not be 0
      if (!req.query.dishId) {
            res.status(400).send({ message: "dishId can not be empty! Specify a dishId in the parameters" })
      } else if (!req.query.qty) {
            res.status(400).send({ message: "qty can not be empty! Specify a quantity in the parameters" })
      } else if (req.query.qty == 0) {
            res.status(400).send({ message: "qty can not be 0! Specify a valid quantity value in the parameters" })
      } else {
            Order.addDishOrder(req.params.orderNo, req.query, (err, data) => {
                  if (err) {
                        if (err.kind == "not_found") {
                              res.status(404).send({
                                    error: `Not found Order or dish.`
                              });
                        } else if (err.kind == "duplicate") {
                              res.status(409).send({error: "The dish is already in the list. Use Put method to update dish from this order's order list"})
                        } else {    
                              res.status(500).send({ error: err.sqlMessage });
                        }
                  } else res.send({ "dishAddedToOrder": data });
            });
      }
};

// Retrieve all orders from the database
exports.findAll = (req, res) => {
      Order.getAll((err, data) => {
            if (err)
                  res.status(500).send({ error: err.sqlMessage });
            else res.send(data);
      });
};


// Find a single Order with the orderNo
exports.findOne = (req, res) => {
      Order.findById(req.params.orderNo, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Not found Order with number ${req.params.orderNo}.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Error retrieving Order with number " + req.params.orderNo
                        });
                  }
            } else res.send(data);
      });
};

// get all the orders of a customer
exports.getOrdersByCustomer = (req, res) => {
      Order.getAllOrdersByCustomer(req.params.customerId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Not found Order with id ${req.params.customerId}.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Error retrieving Order with id " + req.params.customerId
                        });
                  }
            } else res.send(data);
      });
};

// updates an order entry from the order table in the database
exports.updateOrder = (req, res) => {
      // validate params
      if (!req.query.billAmount && !req.query.date && !req.query.orderType) {
            res.status(400).send({message: "No parameters passed in the request, no changes in the database"})
      } else {
            Order.updateOrder(req.params.orderNo, req.query, (err, data) => {
                  if (err) {
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    error: `Order not found`
                              });
                        } else if (err.kind == "bad_date") {
                              res.status(400).send({error: "Invalid date format received"})
                        } else if (err.kind == "bad_orderType") {
                              res.status(400).send({error: "Acceptable values of orderType are only: IN_RESTAURANT, ONLINE, MOBILE"})
                        } else {
                              res.status(500).send({
                                    error: "Error updating Order"
                              });
                        }
                  } else res.send({"orderUpdated": data});
            });            
      }
};


// edits the quantity of this dish in the order list of this order, 
// also updates the total bill amount of this order and the numOfOrders of the dish
// order number, dish id, and quantity must be specified
exports.editDishOrder = (req, res) => {
      console.log("req: ", req.query)
      if (!req.query.dishId) {
            res.status(400).send({ message: "dishId can not be empty! Specify a dishId in the parameters" })
      } else if (!req.query.qty) {
            res.status(400).send({ message: "qty can not be empty! Specify a quantity in the parameters" })
      } else if (req.query.qty == 0) {
            res.status(400).send({ message: "qty can not be 0! Specify a valid quantity value in the parameters" })
      } else {
            Order.editDishOrderQty(req.params.orderNo, req.query, (err, data) => {
                  if (err) {
                        if (err.kind == "not_found") {
                              res.status(404).send({
                                    error: `Not found Order or dish.`
                              });
                        } else {
                              res.status(500).send({ error: err.sqlMessage });
                        }
                  } else res.send({ "dishQtyChanged": data });
            });
      }
};

// delete a dish from the list of dish orders for an order
exports.delDishOrder = (req, res) => {
      // Validate request
      if (!req.query.dishId) {
            res.status(400).send({
                  message: "Content can not be empty! Specify a dishId in the parameters"
            });
      } else {
            Order.delDishOrder(req.params.orderNo, req.query.dishId, (err, result) => {
                  if (err) {
                        if (err.kind == "not_found") {
                              res.status(404).send({
                                    error: `Not found Order or Dish.`
                              });
                        } else {
                              res.status(500).send({
                                    error: "Could not delete dish from order " + req.params.orderNo
                              });
                        }
                  } else res.send({ message: `deleted dish ${req.query.dishId} from order ${req.params.orderNo}` });
            });
      }
}
// deletes an order from the order table in the database given the order's number
exports.delOrder = (req, res) => {
      // call delOrder with the order number
      Order.delOrder(req.params.orderNo, (err, result) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Not found Order with number ${req.params.orderNo}`
                        });
                  } else {
                        res.status(500).send({
                              error: "An error occured when deleting this order" + req.params.orderNo
                        });
                  }
            } else {
                  console.log("result: ", result)
                  res.send({ message: `successfully deleted order ${req.params.orderNo}` });
            }
      });
};

// deletes all orders of a customer with the given customer id
exports.delCustomerOrders = (req, res) => {
      Order.delCustomerOrders(req.params.customerId, (err, data) => {
            if (err) {
                  if (err.kind == "not_found") {
                        res.status(404).send({error: "The customer has no orders or the customer does not exist. No orders to delete"})
                  } else {
                        res.status(500).send({
                              error: "An error occured when deleting the customers orders" + req.params.orderNo
                        });                        
                  }
            } else {
                  res.send({message: data});
            }
      });
};