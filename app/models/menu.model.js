
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Menu = function(menu) {

};

Menu.findById = (menuId, result) => {

};

Menu.getAll = result => {
  sql.query("SELECT * FROM menus", (err, res) => {
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
