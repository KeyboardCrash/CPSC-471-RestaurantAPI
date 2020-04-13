
// customer controller, holds all the methods for dealing with customers in the db
// Won't really have to touch this as it's just verifying data

const Reservations = require("../models/reservations.model.js");

exports.findAll = (req, res) => {
  Reservations.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Reservations.findById(req.params.resId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation not found with id ${req.params.resId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with id " + req.params.resId
        });
      }
    } else res.send(data);
  });
};

exports.findPerRestaurant = (req, res) => {
  Reservations.getPerRestaurant(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Reservation not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with branch id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.createReservation = (req, res) => {
  Reservations.makeReservation(req.query, (err, data) => {
    console.log("Testing req.params");
    console.log(req.query);
    console.log(req.query.resId);


    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Could not create reservation with id ${req.query}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving reservation with id " + req.query
        });
      }
    } else res.send(data);
  });
};