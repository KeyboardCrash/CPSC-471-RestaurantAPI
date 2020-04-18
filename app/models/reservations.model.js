
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Reservations = function(reservations) {
  this.FK_branchId = reservations.FK_branchId;
  this.resId = reservations.resId;
  this.guestCount = reservations.guestCount;
  this.requestedTime = reservations.requestedTime;
  this.reservationSource = reservations.reservationSource;
  this.custId = reservations.custId;
};

// Find reservations by their id
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

// Retrieve all the reservations currently in the db
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

// Grabs the reservations made for a certain restaurant id
Reservations.getPerRestaurant = (branchId, result) => {
  sql.query("SELECT * "
    + "FROM reservations as r, branch as b "
    + `WHERE r.FK_branchId = ? and b.branchId = r.FK_branchId`
    , branchId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
};


Reservations.makeReservation = (newReservation, result) => {
  //console.log(data.custId);

  /*
  sql.query("INSERT INTO reservations (FK_branchId, resId, guestCount, requestedTime, reservationSource, custId) "
    // create new reservation type with the body response and parse with that?
    + `VALUES (${data.FK_branchId}, ${data.resId}, ${data.guestCount}, '${data.requestedTime}', '${data.reservationSource}', ${data.custId})`
    , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
  */
  sql.query("INSERT INTO reservations SET ?", newReservation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newReservation });
    result(null, { id: res.insertId, ...newReservation });
  });
};

// Get the reservations made for a specific customer id
Reservations.getReservationFromCustomer = (custId, result) => {
  sql.query("SELECT * "
    + "FROM reservations as r, customers as c "
    + `WHERE ${custId} = c.id and c.id = r.custId`,
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reservations: ", res);
    result(null, res);
  });
};

// Delete the reservation correlating to the given reservation id
Reservations.deleteReservation = (resId, result) => {
  sql.query("DELETE "
    + "FROM reservations as r "
    + `WHERE r.resId = ${resId}`,
    (err, res) => {
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
