
// customer controller, holds all the methods for dealing with customers in the db
// Won't really have to touch this as it's just verifying data

const Branch = require("../models/branch.model.js");

exports.findAll = (req, res) => {
  Branch.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Branch.findById(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.getBranchInfo = (req, res) => {
  Branch.findBranchInfo(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.getBranchRevenue = (req, res) => {
  Branch.findBranchRevenue(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.getBranchRevenueTotal = (req, res) => {
  Branch.findBranchRevenueTotal(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.getBranchEmployees = (req, res) => {
  Branch.findBranchEmps(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};

exports.getBranchManager = (req, res) => {
  Branch.findBranchManager(req.params.branchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Branch not found with id ${req.params.branchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving branch with id " + req.params.branchId
        });
      }
    } else res.send(data);
  });
};