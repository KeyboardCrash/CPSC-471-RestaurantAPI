
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
    const onlineStatistics = require("../controllers/onlineStatistics.controller.js");
  
    //Create a new onlineStatistic
    app.post("/api/onlineStatistics", onlineStatistics.create);
  
    //Find every onlineStatistic
    app.get("/api/onlineStatistics", onlineStatistics.findAll);
  
    //Find a specific onlineStatistic by branchID
    app.get("/api/onlineStatistics/branch/:branchID", onlineStatistics.findOne);
  
    //Find statistics associated with a specific date
    app.get("/api/onlineStatistics/date/:date", onlineStatistics.findAllByDate);

    //Find statistics greater than a specific number of mobile and website visits
    app.get("/api/onlineStatistics/greatervisits/:num", onlineStatistics.findAllByVisits);

    //Find statistics associated with a specific date
    app.get("/api/onlineStatistics/greatercoupons/:num", onlineStatistics.findAllByCoupons);
  
    //Update a onlineStatistics by statisticID
    app.put("/api/onlineStatistics/:statisticID", onlineStatistics.update);
  
    //Delete a onlineStatistics by statisticID
    app.delete("/api/onlineStatistics/:statisticID", onlineStatistics.delete);
  
  };