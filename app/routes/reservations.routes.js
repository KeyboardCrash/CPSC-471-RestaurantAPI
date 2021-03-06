
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
  const reservations = require("../controllers/reservations.controller.js");

  app.get("/api/reservations", reservations.findAll);

  app.get("/api/reservations/branchId/:branchId", reservations.findPerRestaurant);

  app.get("/api/reservations/:resId", reservations.findOne);

  app.get("/api/reservations/customer/:custId", reservations.findResFromCust);

  app.delete("/api/reservations/:resId", reservations.removeReservation);

  app.post("/api/reservations/create", reservations.createReservation);

};