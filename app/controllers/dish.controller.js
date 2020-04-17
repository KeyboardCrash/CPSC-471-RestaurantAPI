// controller will call methods from the model to call queries
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
            description : req.body.description,
            price : req.body.price,
            numOfOrders : req.body.numOfOrders
      });

      // Save dish in the database
      Dish.create(dish, (err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while creating dish."
                  });
            else res.send({dishCreated: data});
      });
};

// Find a single Dish with a dishId
exports.findOne = (req, res) => {
      Dish.findById(req.params.dishId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Dish with id ${req.params.dishId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Error retrieving Dish with id " + req.params.dishId
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
                              err.message || "Some error occurred while retrieving dishes."
                  });
            else res.send(data);
      });
};

// Update a Dish identified by the dishId in the request
exports.update = (req, res) => {
      // validate params
      if (!req.query.name && !req.query.description && !req.query.price && !req.query.numOfOrders) {
            res.status(400).send({message: "No parameters passed in the request, no changes in the database"})
      } else {
            // set up the dish attributes included in the request
            let params = req.query;
            const dish = new Dish (params);
            console.log("request: ", req.query);

            // call the method from model
            Dish.updateById(req.params.dishId, dish, (err, data) => {
                  if (err) {
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    message: `Not found Dish with id ${req.params.dishId}.`
                              });
                        } else {
                              res.status(500).send({
                                    message: "Error updating Dish with id " + req.params.dishId
                              });
                        }
                  } else res.send({dishUpdated: data});
            });
      }
};


// Delete a Dish with the specified dishId in the request
exports.delete = (req, res) => {
      Dish.remove(req.params.dishId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Dish with id ${req.params.dishId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Could not delete Dish with id " + req.params.dishId
                        });
                  }
            } else {
                  res.send({ message: `Dish was deleted successfully!` })
            };
      });
};

// Delete all dishes from the database.
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
