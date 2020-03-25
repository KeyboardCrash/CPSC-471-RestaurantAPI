
/*Import this to MySQL to create the necessary database*/
CREATE DATABASE IF NOT EXISTS `restaurantdb`;

/*
    Example for creating Customers table (make sure restaurantdb is selected)
*/
CREATE TABLE IF NOT EXISTS `customers` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  active BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `menus` (

)