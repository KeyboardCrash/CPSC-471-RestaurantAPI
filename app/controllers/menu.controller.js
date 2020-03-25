
// customer controller, holds all the methods for dealing with customers in the db
// Won't really have to touch this as it's just verifying data

const Menu = require("../models/menu.model.js");

exports.findAll = (req, res) => {
  Menu.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Menu.findById(req.params.menuId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Menu not found with id ${req.params.menuId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving menu with id " + req.params.menuId
        });
      }
    } else res.send(data);
  });
};

