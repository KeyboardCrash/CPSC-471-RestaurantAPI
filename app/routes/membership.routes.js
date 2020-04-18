// Defines the routes that the api will have
// add the method and controller method per route

module.exports = app => {
      const members = require("../controllers/membership.controller.js");
    
      // Create a new Member
      app.post("/api/membership", members.create);
    
      // Retrieve all Members
      app.get("/api/membership", members.findAll);
    
      // Retrieve a single member by memberId
      app.get("/api/membership/:memberId", members.findOne);
    
      // Update a Membership with memberId
     app.put("/api/membership/:memberId", members.update);
    
      // Delete a member with memberId
     app.delete("/api/membership/:memberId", members.delete);
    
      // Delete all memberships
     app.delete("/api/membership", members.deleteAll);
    };