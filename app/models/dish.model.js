
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");

// constructor
const Dish = function(dish) {
  this.name = dish.name;
  this.description = dish.description;
  this.price = dish.price;
  this.numOfOrders = dish.numOfOrders;
};

// Create and Save a new dish
Dish.create = (newDish, result) => {
  sql.query("INSERT INTO dish SET ?", newDish, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Dish: ", {id: res.insertId, ...newDish});
    result(null, {id: res.insertId, ...newDish});
  });
};

// Find a single Dish with a dishId
Dish.findById = (DishId, result) => {
  sql.query(`SELECT * FROM dish WHERE id = ${DishId}`,  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // received a response with a dish entry
    if (res.length) {
      console.log("found Dish: ", res[0]);
      result(null, res[0]);
      return;
    }

    // otherwise, the response was empty, dish with the id was not found
    result({ kind: "not_found" }, null);
  });
};

// Retrieve all Dish from the database.
Dish.getAll = result => {
  sql.query("SELECT * FROM dish", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Dishes: ", res);
    result(null, res);
  });
};

// Update a Dish identified by the dishId in the request
Dish.updateById = (dishId, dish, result) => {
      let changedDish = new Dish(dish);

      // for those values that should be left unchanged (it wasn't included in the paramters)
      // they are left null and left unchanged when calling the stored procedure
      if (!dish.name) {
            dish.name = null;
      } if (!dish.description) {
            dish.description = null;
      } if (!dish.price) {
            dish.price = null;
      } if (!dish.numOfOrders) {
            dish.numOfOrders = null;
      }
      // stored procedure doesn't require for all parameters to have values
      // optional changing of attributes, null value is left for paramters that the user didn't indicate to change
      sql.query(
        "call restaurantdb.updateDish(?, ?, ?, ?,?);", [dishId, dish.name, dish.description, dish.price, dish.numOfOrders],     
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("result: ", res)
          // stored procedure returned an empty when selecting dish
          if (res[0] != undefined && res[0].length == 0) {
            // not found Membership with the id
            result({ kind: "not_found" }, null);
            return;
          }
          console.log("updated member: ", changedDish);
          result(null, res[0]);
        }
      );
    };


// Delete a Dish with the specified dishId in the request
Dish.remove = (id, result) => {
  sql.query("DELETE FROM dish WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
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

// Delete all dishes from the database.
Dish.removeAll = result => {
  sql.query("DELETE FROM dish", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} dish`);
    result(null, res);
  });
};

module.exports = Dish;
