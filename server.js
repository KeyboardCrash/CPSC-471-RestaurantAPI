const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 
// define api routes
require("./app/routes/customer.routes.js")(app);
require("./app/routes/menu.routes.js")(app);
require("./app/routes/membership.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/dish.routes.js")(app);
require("./app/routes/reservations.routes.js")(app);
require("./app/routes/branch.routes.js")(app);



port = process.env.PORT || 3000;
app.listen(port);
console.log('API server started on: ' + port);

app.get("/", (req, res) => {
    res.json({message:"Restaurant API System"});
});
