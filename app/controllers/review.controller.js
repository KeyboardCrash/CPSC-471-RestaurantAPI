
// Review controller, holds all the methods for dealing with reviews in the db

const Review = require("../models/review.model.js");

// Create and Save a new review
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a review
    const review = new Review({
      reviewID: req.body.reviewID,
      branchID: req.body.branchID,
      position: req.body.position,
      reviewerName: req.body.reviewerName,
      description: req.body.description,
      rating: req.body.rating,
      sourceType: req.body.sourceType,
      sourceName: req.body.sourceName  
    });
  
    // Save review in the database
    Review.create(review, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Review."
        });
      else res.send(data);
    });
};


//Get all reviews
exports.findAll = (req, res) => {
  Review.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message("An error occurred while retrieving menu.")
      });
    else res.send(data);
  });
};

//Get a review by its reviewID
exports.findOne = (req, res) => {
  Review.findByreviewID(req.params.reviewID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Review not found with reviewID ${req.params.reviewID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving review with reviewID " + req.params.reviewID
        });
      }
    } else res.send(data);
  });
};

//Find all reviews by branch ID
exports.findByBranchID = (req, res) => {
    Review.getBybranchID(req.params.branchID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Review not found with branchID ${req.params.branchID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with branchID " + req.params.branchID
          });
        }
      } else res.send(data);
    });
  };

//Find all reviews by source type
  exports.findBySource = (req, res) => {
    Review.getBySource(req.params.sourceType, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Review not found with sourceType ${req.params.sourceType}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving review with sourceType " + req.params.sourceType
          });
        }
      } else res.send(data);
    });
  };

 
// Update a Review identified by the reviewId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Review.updateByReviewID(
      req.params.reviewID,
      new Review(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Review with id ${req.params.reviewID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Review with id " + req.params.reviewID
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a Review with the specified reviewId in the request
exports.delete = (req, res) => {
  Review.remove(req.params.reviewID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Review with reviewID ${req.params.reviewID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Review with reviewID " + req.params.reviewID
        });
      }
    } else res.send({ message: `Review was deleted successfully!` });
  });
};


