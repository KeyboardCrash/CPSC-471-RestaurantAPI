
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Branch = function(branch) {

};

Branch.findById = (branchId, result) => {
  sql.query(`SELECT * FROM branch WHERE branchId=${branchId}`, (err, res) => {
    if (err)
    {
      console.log("error: ". error);
      result(null, err);
      return;
    }
    console.log("Branch " + branchId, res);
    result(null, res);
  });
};

Branch.getAll = result => {
  sql.query("SELECT * FROM branch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Branch: ", res);
    result(null, res);
  });
};

Branch.findBranchInfo = (branchId, result) => {
  sql.query("SELECT * FROM branch as b, information_contactinfo as bci, information_timesopen as bti WHERE "
  + `b.branchId = bci.branchId and b.branchId = bti.branchId and ${branchId} = b.branchId`
  , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Branch: ", res);
    result(null, res);
  });
};

Branch.findBranchEmps = (branchId, result) => {
  sql.query("SELECT e.* FROM branch as b, employee as e WHERE "
  + `b.branchId = e.branchId and b.branchId=${branchId}`
  , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Branch: ", res);
    result(null, res);
  });
};

Branch.findBranchManager = (branchId, result) => {
  sql.query("SELECT e.* FROM branch as b, employee as e WHERE "
  + `b.branchId = ${branchId} and b.branchId = e.branchId and e.position="Manager"`
  , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Branch: ", res);
    result(null, res);
  });
};


module.exports = Branch;
