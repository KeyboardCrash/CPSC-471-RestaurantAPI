const Membership = require("../models/membership.model.js");

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