const Order = require("../models/order.model.js");

exports.getOrdersByCustomer = (req, res) => {
      Order.getAllOrdersByCustomer(req.params.customerId, (err, data) => {
            if (err) {
                  res.status(500).send({
                        message: "Error retrieving Membership with id " + req.params.memberId
                  });
            } else res.send(data);
      });
};
