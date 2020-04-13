
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Reservations = function(Reservations) {

};

Reservations.findById = (reservationId, result) => {
  sql.query(`SELECT * FROM reservations WHERE resId=${reservationId}`, (err, res) => {
    if (err)
    {
      console.log("error: ". error);
      result(null, err);
      return;
    }
    console.log("Reservation " + reservationId, res);
    result(null, res);
  });
};

Reservations.getAll = result => {
  sql.query("SELECT * FROM reservations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
};

Reservations.getPerRestaurant = (branchId, result) => {
  sql.query("SELECT * "
    + "FROM reservations as a, branch as b"
    + `WHERE FK_branchId=${branchId}`
    , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
};


Reservations.makeReservation = (data, result) => {

  sql.query("INSERT INTO reservations (FK_branchId, resId, guestCount, requestedTime, reservationSource) "
    + `VALUES (${data.FK_branchId}, ${data.resId}, ${data.guestCount}, '${data.requestedTime}', '${data.reservationSource}')`
    , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
};

module.exports = Reservations;
