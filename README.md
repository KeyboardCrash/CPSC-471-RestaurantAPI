# CPSC-471-RestaurantAPI
A CPSC 471 Project offering a simple Restaurant API system using Njs, Express and MySQL.

# Setting up mySQL environment
1. Open up mySQL and run everything in "schema.sql" as a query (this will generate all tables for restaurantdb)
2. Run the following queries:
> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
> flush privileges;

# Installing the Project
1. git clone the repository
2. run the command 'npm install'
3. start the server with 'npm start'
4. Access the API by navigating to 'localhost:3000'

# Adding New Routes/Endpoints
1. Add necessary SQL logic to {name}.model.js
2. Add method to {name}.controller.js for sending and erroring the SQL logic (template)
3. Add route to {name}.routes.js so server knows where to call methods when accessed (get, post, put defined)
4. Finally add require route to server.js so the new method is included

# Exporting DB Schema in Workbench
1. Go to server
2. Select Data Export
3. Select the database and tables to Export
4. Tick "Export to self-contained file"
5. Start export - creates an sql file in the location