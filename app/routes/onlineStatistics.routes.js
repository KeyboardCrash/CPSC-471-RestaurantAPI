
// Defines the online statistic routes that the api will have

module.exports = app => {
    const onlineStatistics = require("../controllers/onlineStatistics.controller.js");
  
    //Create a new online statistic
    app.post("/api/onlineStatistics", onlineStatistics.create);
  
    //Find every online statistic
    app.get("/api/onlineStatistics", onlineStatistics.findAll);
  
    //Find all online statistic by branchID
    app.get("/api/onlineStatistics/branch/:branchID", onlineStatistics.findByBranchID);
  
    //Find statistics associated with a specific date
    app.get("/api/onlineStatistics/date/:date", onlineStatistics.findAllByDate);

    //Find statistics greater than a specific number of mobile and website visits
    app.get("/api/onlineStatistics/greatervisits/:num", onlineStatistics.findAllByVisits);

    //Find statistics greater than a specific number of coupons redeemed
    app.get("/api/onlineStatistics/greatercoupons/:num", onlineStatistics.findAllByCoupons);
  
    //Update an online statistic by statisticID
    app.put("/api/onlineStatistics/:statisticID", onlineStatistics.update);
  
    //Delete an online statistic by statisticID
    app.delete("/api/onlineStatistics/:statisticID", onlineStatistics.delete);
  
  };