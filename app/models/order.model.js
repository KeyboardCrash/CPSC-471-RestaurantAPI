const sql = require("./db.js");
var async = require("async");

const Order = function(order) {
      this.billingNo = order.billingNo;
      this.billAmount = order.billAmount;
      this.tipAmount = order.tipAmount;
      this.date = order.date;
      this.customerId = order.customerId;
};


Order.create = (newOrder, result) => {
      sql.query("INSERT INTO `restaurantdb`.`order` (`billAmount`, `tipAmount`, `date`, `customerId`) VALUES ('0', '0', ?, ?);", 
      [newOrder.date, newOrder.customerId], (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            console.log("created order: ", { billingNo: res.insertId, ...newOrder });
            result(null, { billingNo: res.insertId, ...newOrder });
      });
};

// retrieves all order records in the database
Order.getAll = result => {
      sql.query("SELECT * FROM restaurantdb.order", (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
            }
            console.log("orders: ", res);
            result(null, res);
      });
};


Order.findById = (orderNo, result) => {
      sql.query(`SELECT * FROM restaurantdb.order WHERE billingNo = ${orderNo}`, (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            if (res.length) {
                  let thisOrder = res[0]
                  // get list of transactions from this card
                  // query from order to get all orders from this customer
                  // return an object
                  Order.getDishOrder(thisOrder.billingNo,(err,data) => {
                        if (err) {
                              console.log("error in retrieving customer dish orders: ", err);
                              result(err, null);
                              return;
                        }   
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
Order.getAllOrdersByCustomer = (custID,result) => {
      let quit = false;
      sql.query(`call restaurantdb.getAllOrdersbyID(${custID});`, function(err, res,field) {
            if (err) {
                  console.log("failed to get orders of this customer ", err);
                  result(err, null);
                  return;
            } 
            if(res[0].length > 0) {
                  
                  let test = res[0];
                  let orderResult = []

                  async.forEachOf( test, (order, i, inner_callback) => {
                        Order.getDishOrder(order.billingNo, (err,res) => {
                              if (err) {
                                    console.log("error: ", err);
                                    inner_callback(err);
                                    quit = true;
                                    return;
                              }      
                              
                              if (res.length > 0) {
                                 test[i].orderlist = res;   
                                 orderResult.push({billingNo: test[i].billingNo,info: test[i]})

                              } else {
                                 test[i].orderlist = [];   
                                 orderResult.push({billingNo: test[i].billingNo,info: test[i]})

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
                              result(null,orderResult);                                     
                        }  
                  });

                
                       
            } else {
                  result(null,[]);
            }
      }); 
};

Order.addDishOrder = (orderNo, dish, result) => {
      // adds the dish to the list of dish orders of this order, also updates the total bill amount of this order
      sql.query("call restaurantdb.addDishtoOrder(?, ?, ?);", [orderNo, dish.dishId, dish.qty], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("added to the order", res[0]);
            // returns the order_list tuple of this entry including the name of the dish
            result(null, res[0]);
      });
};

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

module.exports = Order;