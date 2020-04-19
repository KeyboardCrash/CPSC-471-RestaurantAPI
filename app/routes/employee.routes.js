
// Defines the employee routes that the api will have

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    
    //Create a new employee
    app.post("/api/employees", employees.create);

    // Retrieve all employees
    app.get("/api/employees", employees.findAll);
  
    // Retrieve a single employee with employee SSN
    app.get("/api/employees/:SSN", employees.findOne);  

    // Update a Customer with SSN
    app.put("/api/employees/:SSN", employees.update);

    // Delete a Customer with SSN
    app.delete("/api/employees/:SSN", employees.delete);

  };