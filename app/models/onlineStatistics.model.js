
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

//Constructor
const OnlineStatistics = function(onlineStatistics) {
    this.statisticID = onlineStatistics.statisticID;
    this.branchID = onlineStatistics.branchID;
    this.date = onlineStatistics.date; 
    this.websiteVisits = onlineStatistics.websiteVisits; 
    this.mobileVisits = onlineStatistics.mobileVisits; 
    this.couponsRedeemed = onlineStatistics.couponsRedeemed;
};

//Create a onlineStatistics
OnlineStatistics.create = (newOnlineStatistics, result) => {
  sql.query("INSERT INTO online_statistics SET ?", newOnlineStatistics, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created onlineStatistics: ", newOnlineStatistics);
    result(null, newOnlineStatistics );
  });
};


//Find onlineStatistics by branchID
OnlineStatistics.findBybranchID = (branchID, result) => {
  sql.query(`SELECT * FROM online_statistics WHERE branchID=${branchID}`, (err, res) => {
    if (err)
    {
      console.log("error: ". error);
      result(null, err);
      return;
    }
    console.log("OnlineStatistics " + branchID, res);
    result(null, res);
  });
};

//Get all onlineStatistics
OnlineStatistics.getAll = result => {
  sql.query("SELECT * FROM online_statistics", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("onlineStatisticss: ", res);
    result(null, res);
  });
};

//Get all the statistics from a specific date
OnlineStatistics.getStatsByDate = (date, result) => {
  sql.query(`SELECT * FROM online_statistics WHERE date =${date}`, (err, res) => {
    if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
    }
    console.log(`All statistics with date ${date}:`, res);
    result(null, res);
});
};


//Get all statistics greater than a specific number of website and mobile visits
OnlineStatistics.getStatsByVisits = (num, result) => {
    sql.query(`SELECT * FROM online_statistics WHERE websiteVisits > ${num} and mobileVisits > ${num}`, (err, res) => {
      if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
      }
      console.log(`All statistics with visits ${num}:`, res);
      result(null, res);
  });
  };
  


//Get all statistics greater than a specific number of coupons redeemed 
OnlineStatistics.getStatsByCoupons = (num, result) => {
    sql.query(`SELECT * FROM online_statistics WHERE couponsRedeemed > ${num} and couponsRedeemed > ${num}`, (err, res) => {
      if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
      }
      console.log(`All statistics with coupons ${num}:`, res);
      result(null, res);
  });
  };


//Update a onlineStatistics
OnlineStatistics.updateByStatisticID = (statisticID, onlineStatistics, result) => {
  sql.query(
    "UPDATE online_statistics SET statisticID = ?, branchID = ?, date = ?, websiteVisits = ?, mobileVisits = ?, couponsRedeemed = ? WHERE statisticID = ?",
    [onlineStatistics.statisticID, onlineStatistics.branchID, onlineStatistics.date, onlineStatistics.websiteVisits, onlineStatistics.mobileVisits, onlineStatistics.couponsRedeemed, statisticID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found onlineStatistics with the statisticID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated onlineStatistics: ", { statisticID: statisticID, ...onlineStatistics });
      result(null, { statisticID: statisticID, ...onlineStatistics });
    }
  );
};

//Remove a onlineStatistics by statisticID
OnlineStatistics.remove = (statisticID, result) => {
  sql.query("DELETE FROM online_statistics WHERE statisticID = ?", statisticID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OnlineStatistics with the statisticID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted onlineStatistics with statisticID: ", statisticID);
    result(null, res);
  });
};



module.exports = OnlineStatistics;


