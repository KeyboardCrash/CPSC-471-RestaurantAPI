
const sql = require("./db.js");
const Order = require("./order.model.js");

// constructor
const Membership = function (membership) {
      this.cardId = membership.cardId;
      this.tier = membership.tierId;
      this.points = membership.points;
      this.lastUsed = membership.lastUsed;
      this.customerId = membership.customerId;
};


Membership.create = (newMember, result) => {
      sql.query("INSERT INTO membership SET ?", newMember, (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            cardId = res.insertId
            console.log("created membership: ", { id: res.insertId, ...newMember });
            result(null, { id: res.insertId, ...newMember });
      });
};

Membership.getAll = result => {
      sql.query("SELECT * FROM membership", (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
            }
            console.log("Members: ", res);
            result(null, res);
      });
};



Membership.findById = (memberId, result) => {
      sql.query(`SELECT * FROM membership WHERE cardId = ${memberId}`, (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
            }
            if (res.length) {
                  let thisMember = res[0]
                  // get list of transactions from this card
                  // query from order to get all orders from this customer
                  // return an object
                  Order.getAllOrdersByCustomer(thisMember.customerId,(err,data) => {
                        if (err) {
                              console.log("error in retrieving customer orders: ", err);
                              result(err, null);
                              return;
                        }   
                        thisMember.transactions = [...data];     
                        console.log("found member: ", thisMember);
                        result(null, thisMember);                           
                  });
                  return;
            }
            // not found Membership with the id
            result({ kind: "not_found" }, null);
      });
};


Membership.updateById = (cardId, member, result) => {
      sql.query(
        "UPDATE membership SET tier = ?, points = ?, lastUsed = ? WHERE cardId = ?",
        [member.tier, member.points, member.lastUsed, cardId],
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
    
          console.log("updated member: ", { cardId: cardId, ...member });
          result(null, { cardId: cardId, ...member });
        }
      );
    };
    

Membership.remove = (id, result) => {
      sql.query("DELETE FROM membership WHERE cardId = ?", id, (err, res) => {
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
    
        console.log("deleted member with cardId: ", id);
        result(null, res);
      });
    };

Membership.removeAll = result => {
      sql.query("DELETE FROM membership", (err, res) => {
            if (err) {
                  console.log("error: ", err);
                  result(null, err);
                  return;
            }

            console.log(`deleted ${res.affectedRows} members`);
            result(null, res);
      });
};

module.exports = Membership;