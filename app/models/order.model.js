const sql = require("./db.js");

const Order = function(order) {
      this.billingNo = order.billingNo;
      this.billAmount = order.billAmount;
      this.tipAmount = order.tipAmount;
      this.date = order.date;
      this.customerId = order.customerId;
};

Order.getAllOrdersByCustomer = (custID,result) => {

      sql.query(`call restaurantdb.getAllOrdersbyID(${custID});`, function(err, res,field) {
            if (err) {
                  console.log("failed to get orders of this customer ", err);
                  result(err, null);
                  return;
            } if(res[0].length > 0) {
                  console.log("oders: ", res);
                  result(null,res[0]);
                       
            } else {
                  result(null,[]);
            }
      }); 
};

Order.getAllOrdersByCustomerObject = (custID,result) => {
      sql.query(`call restaurantdb.getAllOrdersbyID(${custID});`, function(err, res,field) {
            if (err) {
                  console.log("failed to get orders of this customer ", err);
                  result(err, null);
                  return;
            } if(res[0].length > 0) {
                  console.log("oders: ", res);
                  result(null,res[0]);
                  return res[0];
                       
            } else {
                  result(null,[]);
                  return [];
            }
      }); 
};

module.exports = Order;