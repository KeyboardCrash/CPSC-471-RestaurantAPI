
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Menu = function(menu) {

};

Menu.findById = (menuId, result) => {
  sql.query(`SELECT * FROM menu WHERE versionId=${menuId}`, (err, res) => {
    if (err)
    {
      console.log("error: ". error);
      result(null, err);
      return;
    }
    console.log("Menu " + menuId, res);
    result(null, res);
  });
};

Menu.getAll = result => {
  sql.query("SELECT * FROM menu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menus: ", res);
    result(null, res);
  });
};

module.exports = Menu;
