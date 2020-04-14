const Order = require("../models/order.model.js");

exports.createOrder = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    } else {
  
    // Create a new order for this customer
    const order = new Order({
      date: req.body.date,    
      billAmount: 0.0,
      tipAmount: 0.0,
      customerId: req.body.customerId
    });

    console.log(req.body.date)
    // Save Order to the database
    Order.create(req.body, (err, data) => {
      if (err)
        res.status(500).send({error: err.sqlMessage});
      else res.send(data);
    });
   } 
};

// Retrieve all orders from the database
exports.findAll = (req, res) => {
      Order.getAll((err, data) => {
            if (err)
                  res.status(500).send({error: err.sqlMessage});
            else res.send(data);
      });
};


// Find a single Order with the orderNo
exports.findOne = (req, res) => {
      Order.findById(req.params.orderNo, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Order with number ${req.params.orderNo}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Error retrieving Order with number " + req.params.orderNo
                        });
                  }
            } else res.send(data);
      });
};


exports.getOrdersByCustomer = (req, res) => {
      Order.getAllOrdersByCustomer(req.params.customerId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Order with id ${req.params.memberId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Error retrieving Order with id " + req.params.memberId
                        });
                  }
            } else res.send(data);
      });

};

exports.addDishOrder = (req, res) => {
     Order.addDishOrder(req.params.orderNo, req.query, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Order with number ${req.params.orderNo}.`
                        });
                  } else {
                        res.status(500).send({error: err.sqlMessage});
                  }
            } else res.send(data); 
     });
      
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
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    message: `Not found Order with number ${req.params.orderNo}.`
                              });
                        } else if(err.kind === "not_found_dish") {
                              res.status(404).send({
                                    message: `Not found Dish with id ${req.query.dishId}.`
                              });
                        } else {
                              res.status(500).send({
                                    message: "Could not delete Membership with id " + req.params.memberId
                              });
                        }
                  } else res.send({ message: `deleted dish ${req.query.dishId} from order ${req.params.orderNo}`});
            });
      }

}