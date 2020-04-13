
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Dish = function(dish) {
  this.name = dish.name;
  this.quantityMade = dish.quantityMade;
  this.description = dish.description;
  this.price = dish.price;
  this.numOfOrders = dish.numOfOrders;
};

Dish.create = (newDish, result) => {
  sql.query("INSERT INTO dish SET ?", newDish, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Dish: ", newDish);
    result(null, newDish);
  });
};

Dish.findById = (DishId, result) => {
  sql.query(`SELECT * FROM dish WHERE name = ?`, [DishId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Dish: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Dish with the id
    result({ kind: "not_found" }, null);
  });
};

Dish.getAll = result => {
  sql.query("SELECT * FROM dish", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Dishes: ", res);
    result(null, res);
  });
};

Dish.updateById = (dishName, dish, result) => {
      let changedDish = new Dish(dish);


      if (!dish.name) {
            dish.name = null;
      } if (!dish.description) {
            dish.description = null;
      } if (!dish.quantityMade) {
            dish.quantityMade = null;
      } if (!dish.price) {
            dish.price = null;
      } if (!dish.numOfOrders) {
            dish.numOfOrders = null;
      }
      // stored procedure doesn't require for all parameters to have values
      // optional changing of attributes, null value is left for paramters that the user didn't indicate to change
      sql.query(
        "call restaurantdb.updateDish(?, ?, ?, ?,?,?);", [dishName, dish.name, dish.description, dish.quantityMade, dish.price, dish.numOfOrders],     
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found Membership with the id
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("updated member: ", changedDish);
          result(null, changedDish);
        }
      );
    };


Dish.remove = (id, result) => {
  sql.query("DELETE FROM dish WHERE name = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Dish with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted dish with id: ", id);
    result(null, res);
  });
};

Dish.removeAll = result => {
  sql.query("DELETE FROM dish", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} dish`);
    result(null, res);
  });
};

module.exports = Dish;
