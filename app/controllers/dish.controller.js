const Dish = require("../models/dish.model.js");

// Create and Save a new dish
exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
      }
      const dish = new Dish ({
            name : req.body.name,
            quantityMade : req.body.quantityMade,
            description : req.body.description,
            price : req.body.price,
            numOfOrders : req.body.numOfOrders
      });

      // Save dish in the database
      Dish.create(dish, (err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while creating the Customer."
                  });
            else res.send(data);
      });
};

// Find a single Member with a dishId
exports.findOne = (req, res) => {
      Dish.findById(req.params.dishId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Dish with name ${req.params.dishId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Error retrieving Dish with name " + req.params.dishId
                        });
                  }
            } else res.send(data);
      });
};


// Retrieve all Dish from the database.
exports.findAll = (req, res) => {
      Dish.getAll((err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while retrieving memberships."
                  });
            else res.send(data);
      });
};

// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
      // Validate Request
      let params = req.query;
      const dish = new Dish (params);
      console.log("request: ", req.query);

      Dish.updateById(
            req.params.dishId,
            dish,
            (err, data) => {
                  if (err) {
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    message: `Not found Dish with id ${req.params.memberId}.`
                              });
                        } else {
                              res.status(500).send({
                                    message: "Error updating Dish with name " + req.params.dishId
                              });
                        }
                  } else res.send(data);
            }
      );
};


// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
      Dish.remove(req.params.dishId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Dish with name ${req.params.dishId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Could not delete Dish with name " + req.params.dishId
                        });
                  }
            } else res.send({ message: `Dish was deleted successfully!` });
      });
};

// Delete all members from the database.
exports.deleteAll = (req, res) => {
      Dish.removeAll((err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while removing all dishes."
                  });
            else res.send({ message: `All dishes were deleted successfully!` });
      });
};
