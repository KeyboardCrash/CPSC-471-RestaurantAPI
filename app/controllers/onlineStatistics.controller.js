
// Online Statistics controller, holds all the methods for dealing with Online Statistics in the db

const OnlineStatistics = require("../models/onlineStatistics.model.js");

// Create and Save a new onlineStatistics
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a onlineStatistics
  const onlineStatistics = new OnlineStatistics({
    statisticID: req.body.statisticID,
    branchID: req.body.branchID,
    date: req.body.date,
    websiteVisits: req.body.websiteVisits,
    mobileVisits: req.body.mobileVisits,
    couponsRedeemed: req.body.couponsRedeemed,
  });

  // Save onlineStatistics in the database
  OnlineStatistics.create(onlineStatistics, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OnlineStatistics."
      });
    else res.send(data);
  });
};


//Find all onlineStatisticss
exports.findAll = (req, res) => {
  OnlineStatistics.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving onlineStatistics.")
      });
    else res.send(data);
  });
};

//Find all statistics from a specific branchID
exports.findByBranchID = (req, res) => {
  OnlineStatistics.getBybranchID(req.params.branchID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `OnlineStatistics not found with branchID ${req.params.branchID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving onlineStatistics with branchID " + req.params.branchID
        });
      }
    } else res.send(data);
  });
};

//Find all statistics from a specific date 
exports.findAllByDate = (req, res) => {
  OnlineStatistics.getStatsByDate(req.params.date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `OnlineStatistics not found with date ${req.params.date}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving onlineStatistics with date " + req.params.date
        });
      }
    } else res.send(data);
  });
};



//Get all statistics greater than a specific number of website and mobile visits
exports.findAllByVisits = (req, res) => {
    OnlineStatistics.getStatsByVisits(req.params.num, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `OnlineStatistics not found with visits greater than num ${req.params.num}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving onlineStatistics with visits greater than num " + req.params.num
          });
        }
      } else res.send(data);
    });
  };


//Get all statistics greater than a specific number of coupons redeemed 
exports.findAllByCoupons = (req, res) => {
    OnlineStatistics.getStatsByCoupons(req.params.num, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `OnlineStatistics not found with coupons greater than num ${req.params.num}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving onlineStatistics with coupons greater than num " + req.params.num
          });
        }
      } else res.send(data);
    });
  };

  
// Update a OnlineStatistics by statisticID 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  OnlineStatistics.updateByStatisticID(
    req.params.statisticID,
    new OnlineStatistics(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found OnlineStatistics with statisticID ${req.params.statisticID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating OnlineStatistics with statisticID " + req.params.statisticID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a OnlineStatistics with the specified statisticID in the request
exports.delete = (req, res) => {
OnlineStatistics.remove(req.params.statisticID, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found OnlineStatistics with statisticID ${req.params.statisticID}.`
      });
    } else {
      res.status(500).send({
        message: "Could not delete OnlineStatistics with statisticID " + req.params.statisticID
      });
    }
  } else res.send({ message: `OnlineStatistics was deleted successfully!` });
});
};