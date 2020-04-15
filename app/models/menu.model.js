
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

//Constructor
const Menu = function(menu) {
    this.versionID = menu.versionID;
    this.name = menu.name;
    this.dateCreated = menu.dateCreated; 
    this.dateUpdated = menu.dateUpdated; 
};

//Create a menu
Menu.create = (newMenu, result) => {
  sql.query("INSERT INTO menu SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created menu: ", newMenu);
    result(null, newMenu );
  });
};


//Find menu by versionID
Menu.findByVersionID = (versionID, result) => {
  sql.query(`SELECT * FROM menu WHERE versionID=${versionID}`, (err, res) => {
    if (err)
    {
      console.log("error: ". error);
      result(null, err);
      return;
    }
    console.log("Menu " + versionID, res);
    result(null, res);
  });
};

//Get all menus
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

//Get all the dish information associated with a menu
Menu.getDishes = (versionID, result) => {
  sql.query(`SELECT D.name, D.description, D.price FROM dish AS D, listed_in, menu WHERE versionID =${versionID} and versionID = menuVersionID and dishID = id`, (err, res) => {
    if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
    }
    console.log(`All dishes with menu ${versionID}:`, res);
    result(null, res);
});
};

//Update a menu
Menu.updateByVersionID = (versionID, menu, result) => {
  sql.query(
    "UPDATE menu SET versionID = ?, name = ?, dateCreated = ?, dateUpdated = ? WHERE versionID = ?",
    [menu.versionID, menu.name, menu.dateCreated, menu.dateUpdated, versionID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found menu with the versionID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated menu: ", { versionID: versionID, ...menu });
      result(null, { versionID: versionID, ...menu });
    }
  );
};

//Remove a menu by versionID
Menu.remove = (versionID, result) => {
  sql.query("DELETE FROM menu WHERE versionID = ?", versionID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Menu with the versionID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted menu with versionID: ", versionID);
    result(null, res);
  });
};



module.exports = Menu;


