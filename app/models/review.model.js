// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// Review constructor
const Review = function(review) {
    this.reviewID = review.reviewID; 
    this.branchID = review.branchID;
    this.reviewerName = review.reviewerName;
    this.description = review.description;
    this.rating = review.rating;
    this.sourceType = review.sourceType;
    this.sourceName = review.sourceName;
  };

//Creata a review
Review.create = (newReview, result) => {
    sql.query("INSERT INTO review SET ?", newReview, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created review: ", newReview);
      result(null, newReview);
    });
  };

//Get all reviews
Review.getAll = result => {
    sql.query("SELECT * FROM review", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("All reviews: ", res);
      result(null, res);
    });
  };

//Get a review by its reviewID
Review.findByreviewID = (reviewID, result) => {
    sql.query(`SELECT * FROM review WHERE reviewID = ${reviewID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Review by reviewID: " + reviewID, res);
      result(null, res);

    });
  };


//Get a review by branchID
Review.getBybranchID = (branchID, result) => {
    sql.query(`SELECT * FROM review WHERE branchID = ${branchID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Review by branchID: " + branchID, res);
      result(null, res);

    });
  };


//Get a review by its platform type 
Review.getBySource = (sourceType, result) => {
    sql.query(`SELECT * FROM review WHERE sourceType = ${sourceType}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Review by sourceType: " + sourceType, res);
      result(null, res);

    });
  };


//Update a review
Review.updateByReviewID = (reviewID, review, result) => {
sql.query(
    "UPDATE review SET reviewID = ?, branchID = ?, reviewerName = ?, description = ?, rating = ?, sourceType = ?, sourceName = ? WHERE reviewID = ?",
    [review.reviewID, review.branchID, review.reviewerName, review.description, review.rating, review.sourceType, review.sourceName, reviewID],
    (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
    }

    if (res.affectedRows == 0) {
        // not found Review with the id
        result({ kind: "not_found" }, null);
        return;
    }

    console.log("updated review: ", { reviewID: reviewID, ...review });
    result(null, { reviewID: reviewID, ...review });
    }
);
};
  
//Remove a review
Review.remove = (reviewID, result) => {
sql.query("DELETE FROM review WHERE reviewID = ?", reviewID, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }

    if (res.affectedRows == 0) {
    // not found Review with the id
    result({ kind: "not_found" }, null);
    return;
    }

    console.log("deleted review with reviewID: ", reviewID);
    result(null, res);
});
};

module.exports = Review;
  
