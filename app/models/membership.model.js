
const sql = require("./db.js");

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
            console.log("members: ", res);
            result(null, res);
      });
};

module.exports = Membership;