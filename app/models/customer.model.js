
// When controller receives a call, it will check the model and run these sql queries

const sql = require("./db.js");
const Order = require("./order.model.js");
const Membership = require("./membership.model.js");

// constructor
const Customer = function (customer) {
	this.email = customer.email;
	this.fname = customer.fname;
	this.lname = customer.lname;
};

// Take parameters from the newCustomer object and insert fields into the database
Customer.create = (newCustomer, result) => {
	sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created customer: ", { id: res.insertId, ...newCustomer });
		result(null, { id: res.insertId, ...newCustomer });
	});
};

// Find a customer by their customer id
Customer.findById = (customerId, result) => {
	sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found customer: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Customer with the id
		result({ kind: "not_found" }, null);
	});
};

// Retrieve all the customers available in the database
Customer.getAll = result => {
	sql.query("SELECT * FROM customers", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("customers: ", res);
		result(null, res);
	});
};

// Update the customer by id using a customer object passed in
Customer.updateById = (id, customer, result) => {
	sql.query(
		"UPDATE customers SET email = ?, fname = ?, lname = ? WHERE id = ?",
		[customer.email, customer.fname, customer.lname, id],
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Customer with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated customer: ", { id: id, ...customer });
			result(null, { id: id, ...customer });
		}
	);
};

// deletes a customer from the database, if customer has a membership, that is also deleted
// if the customer has orders, those are also deleted
Customer.remove = (id, result) => {
	// find first if the customer exists
	Customer.findById(id, (err, res) => {
		if (err) {
			console.log("error", err);
			if (err.kind == "not_found") {
				result({ kind: "not_found" }, null);
			} else {
				result(err, null);			
			}
			return
		}
		// now call the stored procedure, which will delete customer's membership (if they have one)
		// and orders
		sql.query(`call restaurantdb.deleteCustomer(${id});`, (err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}
			console.log("deleted customer with id: ", id);
			result(null, res);
		});
	});


};

// Find the customers phone number by joining the customer and the phone table
Customer.findPhoneById = (customerId, result) => {
	sql.query(`SELECT cphone.phone FROM customers as c, customer_phone as cphone WHERE c.id = ${customerId} and c.id = cphone.customerId`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found customer: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Customer with the id
		result({ kind: "not_found" }, null);
	});
};

// Find the customers address by joining the customer and the address table
Customer.findAddrById = (customerId, result) => {
	sql.query(`SELECT ca.address FROM customers as c, customer_address as ca WHERE id = ${customerId} and c.id = ca.customerId`, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log("found customer: ", res[0]);
			result(null, res[0]);
			return;
		}

		// not found Customer with the id
		result({ kind: "not_found" }, null);
	});
};

module.exports = Customer;
