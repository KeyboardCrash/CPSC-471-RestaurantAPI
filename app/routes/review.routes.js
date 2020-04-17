
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
    const review = require("../controllers/review.controller.js");
    
    //Create a new review
    app.post("/api/review", review.create);

    // Retrieve all review
    app.get("/api/review", review.findAll);

    //Retrieve reviews by branchID
    app.get("/api/review/branch/:branchID", review.findByBranchID);

    //Retrieve reviews by sourceType
    app.get("/api/review/source/:sourceType", review.findBySource);
  
    // Retrieve a single review with review reviewID
    app.get("/api/review/:reviewID", review.findOne);  

    // Update a Review with reviewID
    app.put("/api/review/:reviewID", review.update);

    // Delete a Review with reviewId
    app.delete("/api/review/:reviewID", review.delete);

  };