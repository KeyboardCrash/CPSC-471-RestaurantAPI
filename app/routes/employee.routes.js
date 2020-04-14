
// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    
    //Create a new employee
    app.post("/employees", employees.create);

    // Retrieve all employees
    app.get("/employees", employees.findAll);
  
    // Retrieve a single employee with employee SSN
    app.get("/employees/:SSN", employees.findOne);  

    // Update a Customer with SSN
    app.put("/employees/:SSN", employees.update);

    // Delete a Customer with employeeId
    app.delete("/employees/:SSN", employees.delete);

  };