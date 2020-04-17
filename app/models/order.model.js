// When controller receives a call, it will check the model and run these sql queries
const sql = require("./db.js");
var async = require("async");

const Order = function (order) {
      this.billingNo = order.billingNo;
      this.customerId = order.customerId;
      this.billAmount = order.billAmount;
      this.date = order.date;
      this.orderType = order.orderType;
};

// creates an order for a customer
Order.create = (newOrder, result) => {
      // only these are acceptable for orderType
      if (newOrder.orderType != null && newOrder.orderType != "IN_RESTAURANT" && newOrder.orderType != "MOBILE" && newOrder.orderType != "ONLINE") {
            result({kind: "bad_orderType"}, null)
            return
      }

      sql.query("INSERT INTO `restaurantdb`.`order` (`customerId`, `billAmount`, `date`, `orderType`) VALUES (?, '0', ?, ?);",
            [newOrder.customerId, newOrder.date, newOrder.orderType], (err, res) => {
                  if (err) {
                        console.log("error: ", err.errno);
                        if (err.errno == 1452) { // issues with foreign keys (given customerId) was not found
                              result({kind: "not_found"}, null);
                        } else if (err.errno == 1292){      // bad date format
                              result({kind: "bad_date"}, null);
                        } else {
                              result(err, null);                            
                        }
                        return;  
                  }
                  console.log("created order: ", { billingNo: res.insertId, ...newOrder });
                  result(null, { billingNo: res.insertId, ...newOrder });
            });
};

// adds the dish to the list of dish orders of this order, also updates the total bill amount of this order
Order.addDishOrder = (orderNo, dish, result) => {
      sql.query("call restaurantdb.addDishtoOrder(?, ?, ?);", [orderNo, dish.dishId, dish.qty], (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }

            // returns error code when inserting duplicate key
            if (res[0][0].Code != undefined) {
                  if (res[0][0].Code == 1062) { // duplicate keys (dish already exists in the order's order list)
                     result({kind: "duplicate"},null)
                     return   
                  } else {    // foreign key constraint
                        result({kind: "not_found"})
                        return
                  }                 
            }
            console.log("added to the order", res[0]);
            // returns the order_list tuple of this entry including the name of the dish
            result(null, res[0]);
      });
};

// retrieves all order records in the database
Order.getAll = result => {
      sql.query("SELECT * FROM restaurantdb.order", (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            console.log("orders: ", res);
            result(null, res);
      });
};

// Find a single Order with the orderNo
Order.findById = (orderNo, result) => {
      sql.query(`SELECT * FROM restaurantdb.order WHERE billingNo = ${orderNo}`, (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            // if response contains an order entry
            if (res.length) {
                  let thisOrder = res[0]
                  // get list of transactions from this card
                  // query from order to get all orders from this customer
                  // return an object
                  Order.getDishOrder(thisOrder.billingNo, (err, data) => {
                        if (err) {
                              console.log("error in retrieving customer dish orders: ", err);
                              result(err, null);
                              return;
                        }
                        // include the order list of this order to the response
                        thisOrder.order_list = [...data];
                        console.log("found order_list: ", thisOrder);
                        result(null, thisOrder);
                  });
                  return;
            }
            // not found Membership with the id
            result({ kind: "not_found" }, null);
      });
};

// get all the orders of a customer
Order.getAllOrdersByCustomer = (custID, result) => {
      sql.query(`SELECT * FROM restaurantdb.order WHERE customerId = ${custID}`, function (err, res) {
            if (err) {
                  console.log("failed to get orders of this customer ", err);
                  result(err, null);
                  return;
            }
            // customer has no orders
            if (res.length == 0) {
                  result(null, []);
            }
            // customer has orders
            else if (res.length > 0) {

                  let test = res;
                  let orderResult = []

                  // customer may have multiple order entries
                  // for each order, get the list of dishes ordered for that order
                  async.forEachOf(test, (order, i, inner_callback) => {
                        // get all dish orders of this order
                        Order.getDishOrder(order.billingNo, (err, res) => {
                              if (err) {
                                    console.log("error: ", err);
                                    inner_callback(err);
                                    quit = true;
                                    return;
                              }
                              // if response returned one or more dish entries
                              if (res.length > 0) {
                                    test[i].orderlist = res;
                                    orderResult.push({ billingNo: test[i].billingNo, info: test[i] })

                              } else {
                                    // otherwise, this order's order list is empty
                                    test[i].orderlist = [];
                                    orderResult.push({ billingNo: test[i].billingNo, info: test[i] })

                              }
                              console.log("dish order list: ", test[i]);
                              inner_callback(null);
                        });
                  }, (err) => {
                        if (err) {
                              console.log("error: ", err);
                              result(err, null);
                        } else {
                              console.log("orders: ", test);
                              result(null, orderResult);
                        }
                  });
            }
      });
};


// retrieves all dishes in the list of orders in an order. Not used in any of the Order methods in the api
// but is used in get orders by number/customer to retrieve all dishes in the list of orders in an order
Order.getDishOrder = (orderNo, result) => {
      sql.query("SELECT orderNo, dishId, name, qty FROM order_list, dish where orderNo = ? and dishId = dish.id", [orderNo], (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            console.log(res);
            result(null, res);
      });
};


// updates an order entry from the order table in the database
Order.updateOrder = (orderNo, newOrder, result) => {
      let changeOrder = new Order(newOrder)

      // for those values that you didn't wish to change (wasn't included in the paramters)
      // they are left null and left unchanged when calling the stored procedure
      if (!changeOrder.billAmount) {
            changeOrder.billAmount = null
      } if (!changeOrder.date) {
            changeOrder.date = null
      } if (!changeOrder.orderType) {
            changeOrder.orderType = null
      }

      // only these are acceptable for orderType
      if (changeOrder.orderType != null && changeOrder.orderType != "IN_RESTAURANT" && changeOrder.orderType != "MOBILE" && changeOrder.orderType != "ONLINE") {
            result({kind: "bad_orderType"}, null)
            return
      }

      // stored procedure doesn't require for all parameters to have values
      // optional changing of attributes, null value is left for paramters that the user didn't indicate to change
      sql.query("call restaurantdb.updateOrder(?,?,?,?)", [orderNo, changeOrder.billAmount, changeOrder.date, changeOrder.orderType]
      , (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  if (err.errno == 1292) {      // sql error when parsing date
                        result({kind: "bad_date"}, null)
                  } else {
                       result(err, null); 
                  }
                  return;
                }
                // if response returns an order
                if (res[0].length == 0) {
                  // not found order
                  result({ kind: "not_found" }, null);
                  return;
                }
                console.log("updated order", res[0]);
                result(null, res[0]);
      });
};

// edits the quantity of this dish in the order list of this order, 
// also updates the total bill amount of this order and the numOfOrders of the dish
Order.editDishOrderQty = (orderNo, dish, result) => {
      sql.query("call restaurantdb.updateDishOrderQty(?, ?, ?);", [orderNo, dish.dishId, dish.qty], (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
           // console.log("result: ", res[0].length);
            if (res[0].length > 0) {
                  if (res[0][0].Code != undefined) {
                        //console.log("result", res);
                        // 1048 Usually shows up here (error for null columns) 
                        // one of the columns involving customer id and dish id is null
                        // meaning they were not found
                        result({kind: "not_found"}, null)
                        return
                  }
                  console.log("changed qty of this dish", res[0]);
                  // returns the order_list tuple of this entry including the name of the dish
                  result(null, res[0]);                  
            } else {
                  result({kind: "not_found"}, null)
                  return
            }

      });
}

// delete a dish from the list of dish orders for an order
Order.delDishOrder = (orderNo, dishId, result) => {
      // delete dish from order_list with this order number
      // updates the billing amount of this order and the number of orders of the dish
      // because of the deletion of this dish order
      sql.query(`call restaurantdb.deleteDishOrder(${orderNo},${dishId})`, (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            console.log("result: ", res)
            // stored procedure may return an error code
            // when order number or dishId was not found
            if (res[0] != undefined && res[0][0].Code != undefined) {
                     result({kind: "not_found"},null)
                     return              
            }
            // returns the order_list tuple of this entry including the name of the dish
            console.log(`deleted dish ${dishId} from order ${orderNo}`);
            result(null, res);
      });
};

// deletes an order from the order table in the database given the order's number
Order.delOrder = (orderNo, result) => {
      // updates the numOfOrders for all the dishes in the order,
      // deletes all entries of dishes in its order_list
      // then deletes the order itself
      sql.query(`call restaurantdb.deleteOrder(${orderNo});`, (err, res) => {
            if (err) {
                  console.log("error: ", err)
                  result(err, null)
                  return
            }
            // no affected rows in the query result
            if (res.affectedRows == 0) {
                  // did not find order
                  result({kind: "not_found"}, null)
                  return
            }
            result(null, res)
      });
};

// deletes all orders of a customer with the given customer id
Order.delCustomerOrders = (custId, result) => {
      // check first if the customer has orders
      Order.getAllOrdersByCustomer(custId, (err, res) => {
            if (err) {
                  console.log("error: ", err)
                  result(err, null)
                  return
            }
            // the customer has orders to delete
            if (res.length) {
                  sql.query(`call restaurantdb.deleteCustomerOrders(${custId});`, (err, res) => {
                        if (err) {
                              console.log("error: ", err)
                              result(err, null)
                              return
                        }
                        result(null, "Successfully deleted all orders of this customer");
                  });                  
            } else { // if the customer has no orders, then we are done since there is no orders to delete
                  result({ kind: "not_found" }, null);
                  return;
            }
      });
};

module.exports = Order;