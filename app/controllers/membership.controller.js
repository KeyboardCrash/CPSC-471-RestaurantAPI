const Membership = require("../models/membership.model.js");

// Create and Save a new member
exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
      }

      // Create a new membership
      const membership = new Membership({
            lastUsed: req.body.lastUsed,
            customerId: req.body.customerId
      });

      if (req.body.tier) membership.tier = req.body.tier
      else membership.tier = 0
      if (req.body.points) membership.points = req.body.points
      else membership.points = 0

      // Save Member in the database
      Membership.create(membership, (err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while creating the Customer."
                  });
            else res.send(data);
      });
};

// Find a single Member with a memberId
exports.findOne = (req, res) => {
      Membership.findById(req.params.memberId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Membership with id ${req.params.memberId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Error retrieving Membership with id " + req.params.memberId
                        });
                  }
            } else res.send(data);
      });
};


// Retrieve all Membership from the database.
exports.findAll = (req, res) => {
      Membership.getAll((err, data) => {
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
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
      }
      console.log("request: ", req.query);

      Membership.updateById(
            req.params.memberId,
            req.body,
            (err, data) => {
                  if (err) {
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    message: `Not found Membership with id ${req.params.memberId}.`
                              });
                        } else {
                              res.status(500).send({
                                    message: "Error updating Membership with id " + req.params.memberId
                              });
                        }
                  } else res.send(data);
            }
      );
};


// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
      Membership.remove(req.params.memberId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              message: `Not found Membership with id ${req.params.memberId}.`
                        });
                  } else {
                        res.status(500).send({
                              message: "Could not delete Membership with id " + req.params.memberId
                        });
                  }
            } else res.send({ message: `Member was deleted successfully!` });
      });
};

// Delete all members from the database.
exports.deleteAll = (req, res) => {
      Membership.removeAll((err, data) => {
            if (err)
                  res.status(500).send({
                        message:
                              err.message || "Some error occurred while removing all memberships."
                  });
            else res.send({ message: `All Memberships were deleted successfully!` });
      });
};
