// controller will call methods from the model to call queries
const Membership = require("../models/membership.model.js");

// Create and Save a new member
exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
            res.status(400).send({
                  message: "Content can not be empty!"
            });
      }
      // Create a new membership with the given attributes in the
      // body of the request
      const membership = new Membership({
            lastUsed: req.body.lastUsed,
            customerId: req.body.customerId
      });
      // set their tier and points here...since it doesn't work above
      if (req.body.tier) membership.tier = req.body.tier
      else membership.tier = 0
      if (req.body.points) membership.points = req.body.points
      else membership.points = 0

      // Save Member in the database
      Membership.create(membership, (err, data) => {
            if (err) {
                  if (err.kind == "not_found") {
                        res.status(404).send({
                              error: `Not found Customer with id ${membership.customerId}.`
                        });
                  } else if (err.kind == "duplicate") {
                        res.status(409).send({error: "This customer already has a membership"})
                  } else {    
                        res.status(500).send({ error: err.sqlMessage });
                  }
             } else res.send({memberCreated: data});
      });
};

// Retrieve all Membership from the database.
exports.findAll = (req, res) => {
      Membership.getAll((err, data) => {
            if (err)
                  res.status(500).send({
                        error:
                              err.message || "Some error occurred while retrieving memberships."
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
                              error: `Not found Membership with id ${req.params.memberId}.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Error retrieving Membership with id " + req.params.memberId
                        });
                  }
            } else res.send(data);
      });
};


// find the membership entry with the given customer id
exports.findCustomer = (req, res) => {
      Membership.findCustomer(req.params.custId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Not found Membership with customer id ${req.params.custId}.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Error retrieving Membership with customer id " + req.params.custId
                        });
                  }
            } else res.send(data);
      });
};


// Update a Member identified by the memberId in the request
exports.update = (req, res) => {
      console.log("request: ", req.query);
      //console.log("request: ", req)
      // validate params
      if (!req.query.tier && !req.query.points && !req.query.lastUsed) {
            res.status(400).send({error: "No parameters passed in the request, no changes in the database"})
      } else {
      Membership.updateById(
            req.params.memberId,
            req.query,
            (err, data) => {
                  if (err) {
                        if (err.kind === "not_found") {
                              res.status(404).send({
                                    error: `Not found Membership with id ${req.params.memberId}.`
                              });
                        } else if (err.kind == "bad_date") {
                              res.status(400).send({error: "Invalid date format received"})
                        } else if (err.kind == "checked_empty") {
                              res.status(400).send({error: "Please uncheck any parameters with empty values"})
                        } else {
                              res.status(500).send({
                                    error: "Error updating Membership with id " + req.params.memberId
                              });
                        }
                  } else res.send({memberUpdated: data});
            }
      );
      }
};


// Delete a Member with the specified memberId in the request
exports.delete = (req, res) => {
      Membership.remove(req.params.memberId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Not found Membership with id ${req.params.memberId}.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Could not delete Membership with id " + req.params.memberId
                        });
                  }
            } else res.send({ message: `Member was deleted successfully!` });
      });
};

// deletes a membership entry with the given customer id
exports.deleteCustomerMembership = (req, res) => {
      Membership.removeCustomerMembership(req.params.custId, (err, data) => {
            if (err) {
                  if (err.kind === "not_found") {
                        res.status(404).send({
                              error: `Customer with id ${req.params.custId} has no membership.`
                        });
                  } else {
                        res.status(500).send({
                              error: "Could not delete Membership with id " + req.params.memberId
                        });
                  }
            } else res.send({ message: `Member with customer id ${req.params.custId} was deleted successfully!` });            
      });
};

// Delete all members from the database.
exports.deleteAll = (req, res) => {
      Membership.removeAll((err, data) => {
            if (err)
                  res.status(500).send({
                        error: err.message || "Some error occurred while removing all memberships."
                  });
            else res.send({ message: `All Memberships were deleted successfully!` });
      });
};
