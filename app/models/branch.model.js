
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


module.exports = Branch;
