
//Menu controller, holds all the methods for dealing with Menus in the db

const Menu = require("../models/menu.model.js");

// Create and Save a new menu
exports.create = (req, res) => {
  // ValversionIDate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a menu
  const menu = new Menu({
    versionID: req.body.versionID,
    name: req.body.name,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
  });

  // Save menu in the database
  Menu.create(menu, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Menu."
      });
    else res.send(data);
  });
};


//Find all menus
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

//Find a specific menu by version ID
exports.findOne = (req, res) => {
  Menu.findByVersionID(req.params.versionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Menu not found with versionID ${req.params.versionID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving menu with versionID " + req.params.versionID
        });
      }
    } else res.send(data);
  });
};

//Find all dishes for a specific menu by version ID
exports.findAllDishes = (req, res) => {
  Menu.getDishes(req.params.versionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Menu not found with versionID ${req.params.versionID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving menu with versionID " + req.params.versionID
        });
      }
    } else res.send(data);
  });
};


//Add a specific dish to a menu
exports.addMenuDish = (req, res) => {
  Menu.insertMenuDish(req.params.menuVersionID, req.params.dishID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Menu ${req.params.menuVersionID} and/or dish ${req.params.dishID} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving menu with versionID ${req.params.menuVersionID} and/or dish ${req.params.dishID}`
        });
      }
    } else res.send({message: `Dish ${req.params.dishID} was added onto menu with versionID ${req.params.menuVersionID}`});
  });
};

// Update a Menu by versionID 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Menu.updateByVersionID(
    req.params.versionID,
    new Menu(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with versionID ${req.params.versionID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Menu with versionID " + req.params.versionID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Menu with the specified versionID in the request
exports.delete = (req, res) => {
Menu.remove(req.params.versionID, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Menu with versionID ${req.params.versionID}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete Menu with versionID " + req.params.versionID
      });
    }
  } else res.send({ message: `Menu was deleted successfully!` });
});
};

