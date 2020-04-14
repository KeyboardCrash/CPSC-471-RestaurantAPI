CREATE DATABASE  IF NOT EXISTS `restaurantdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurantdb`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurantdb
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branchID` int NOT NULL,
  `menuVersionId` varchar(45) NOT NULL,
  `ownerSSN` int NOT NULL,
  PRIMARY KEY (`branchID`,`ownerSSN`),
  UNIQUE KEY `branchID_UNIQUE` (`branchID`),
  KEY `SSN_idx` (`ownerSSN`),
  CONSTRAINT `SSN` FOREIGN KEY (`ownerSSN`) REFERENCES `owner` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'1',300000),(2,'1',300001),(3,'1',300001),(4,'1.1',300002);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `customer_phone`
--

DROP TABLE IF EXISTS `customer_phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_phone` (
  `customerId` int NOT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`customerId`,`phone`),
  CONSTRAINT `phoneCustomerId` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_phone`
--

LOCK TABLES `customer_phone` WRITE;
/*!40000 ALTER TABLE `customer_phone` DISABLE KEYS */;
INSERT INTO `customer_phone` VALUES (10,234847),(11,123456),(12,234456);
/*!40000 ALTER TABLE `customer_phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (10,'a@gmail.com','Alpha','Cust'),(11,'b@gmail.com','Beta','Cust'),(12,'c@gmail.com','Charlie','Cust');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `cutomer_address`
--

DROP TABLE IF EXISTS `customer_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_address` (
  `customerId` int NOT NULL,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY (`customerId`,`address`),
  CONSTRAINT `customerIdAdress` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_address`
--

LOCK TABLES `customer_address` WRITE;
/*!40000 ALTER TABLE `customer_address` DISABLE KEYS */;
INSERT INTO `customer_address` VALUES (10,'12 Bacon Drive'),(11,'144 Washington Hill'),(12,'2222 Britannia Place');
/*!40000 ALTER TABLE `customer_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `quantityMade` int NOT NULL DEFAULT '0',
  `price` double NOT NULL,
  `numOfOrders` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `dishId_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `SSN` int NOT NULL,
  `branchID` int NOT NULL,
  `position` varchar(45) NOT NULL,
  `yearsOfExperience` int NOT NULL,
  `phone` varchar(45) NOT NULL,
  `salary` float NOT NULL,
  `city` varchar(45) NOT NULL,
  `zipCode` varchar(45) NOT NULL,
  `fName` varchar(45) NOT NULL,
  `lName` varchar(45) NOT NULL,
  PRIMARY KEY (`SSN`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`),
  KEY `branchID_idx` (`branchID`),
  CONSTRAINT `branchID` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,1,'Cashier',1,'123456',20,'Calgary','1234','Bacon','McNuggets'),(2,1,'Waiter',2,'234121',30,'Edmonton','1234','Wendys','Savage'),(3,2,'Waitress',3,'123121',50,'Vancouver','5251','Jeeves','TheSearchEngine'),(4,1,'Manager',15,'931278',100,'Toronto','93252','Geico','Lizard');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `in_restaurant`
--

DROP TABLE IF EXISTS `in_restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `in_restaurant` (
  `orderBillingNo` int NOT NULL,
  PRIMARY KEY (`orderBillingNo`),
  CONSTRAINT `restaurantBillNo` FOREIGN KEY (`orderBillingNo`) REFERENCES `order` (`billingNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information` (
  `branchId` int NOT NULL,  
  `typeOfCuisine` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`branchId`),
  UNIQUE KEY `branchId_UNIQUE` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information`
--

LOCK TABLES `information` WRITE;
/*!40000 ALTER TABLE `information` DISABLE KEYS */;
INSERT INTO `information` VALUES (1,'1','Asian','China'),(2,'1','Asian','United States');
/*!40000 ALTER TABLE `information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information_contactinfo`
--

DROP TABLE IF EXISTS `information_contactinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information_contactinfo` (
  `branchID` int NOT NULL,
  `phoneNumber` int NOT NULL,
  `website` varchar(45) DEFAULT NULL,
  `fake_contact_pk` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`fake_contact_pk`),
  KEY `branchID` (`branchID`),
  CONSTRAINT `branchID_c` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_contactinfo`
--

LOCK TABLES `information_contactinfo` WRITE;
/*!40000 ALTER TABLE `information_contactinfo` DISABLE KEYS */;
INSERT INTO `information_contactinfo` VALUES (1,123456,'1.com',1),(2,234567,'2.com',2),(3,345678,'3.com',3),(4,456789,'4.com',4);
/*!40000 ALTER TABLE `information_contactinfo` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `information_timesopen`
--

DROP TABLE IF EXISTS `information_timesopen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `information_timesopen` (
  `branchID` int NOT NULL,
  `weekDay` varchar(45) NOT NULL,
  `timeOpen` time NOT NULL,
  `timeClose` time NOT NULL,
  PRIMARY KEY (`branchID`,`weekDay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_timesopen`
--

LOCK TABLES `information_timesopen` WRITE;
/*!40000 ALTER TABLE `information_timesopen` DISABLE KEYS */;
INSERT INTO `information_timesopen` VALUES (1,'1','08:00:00','16:00:00'),(2,'2','06:00:00','20:00:00'),(3,'3','11:00:00','06:00:00'),(4,'4','09:00:00','05:00:00');
/*!40000 ALTER TABLE `information_timesopen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listed_in`
--

DROP TABLE IF EXISTS `listed_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listed_in` (
  `dishId` int NOT NULL,
  `menuVersionId` int NOT NULL,
  PRIMARY KEY (`dishId`,`menuVersionId`),
  KEY `listMenuVerId_idx` (`menuVersionId`),
  CONSTRAINT `listDishID` FOREIGN KEY (`dishId`) REFERENCES `dish` (`id`),
  CONSTRAINT `listMenuVerId` FOREIGN KEY (`menuVersionId`) REFERENCES `menu` (`versionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership` (
  `cardId` int NOT NULL AUTO_INCREMENT,
  `tier` int NOT NULL DEFAULT '0',
  `points` int NOT NULL DEFAULT '0',
  `lastUsed` date NOT NULL,
  `customerId` int NOT NULL,
  PRIMARY KEY (`cardId`),
  UNIQUE KEY `customerId_UNIQUE` (`customerId`),
  KEY `memerCustId_idx` (`customerId`),
  CONSTRAINT `memerCustId` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `versionId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `dateCreated` date NOT NULL,
  `dateUpdated` date NOT NULL,
  PRIMARY KEY (`versionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mobile`
--

DROP TABLE IF EXISTS `mobile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile` (
  `orderBillingNo` int NOT NULL,
  `appName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderBillingNo`),
  CONSTRAINT `mobileBillNo` FOREIGN KEY (`orderBillingNo`) REFERENCES `order` (`billingNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `online`
--

DROP TABLE IF EXISTS `online`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `online` (
  `orderBillingNo` int NOT NULL,
  `Website` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderBillingNo`),
  CONSTRAINT `onlineBillNo` FOREIGN KEY (`orderBillingNo`) REFERENCES `order` (`billingNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `billingNo` int NOT NULL AUTO_INCREMENT,
  `billAmount` double NOT NULL,
  `tipAmount` double NOT NULL,
  `date` timestamp(6) NULL DEFAULT NULL,
  `customerId` int NOT NULL,
  PRIMARY KEY (`billingNo`,`customerId`),
  UNIQUE KEY `billingNo_UNIQUE` (`billingNo`),
  KEY `billingCustomerID_idx` (`customerId`),
  CONSTRAINT `billingCustomerID` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_list`
--

DROP TABLE IF EXISTS `order_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_list` (
  `orderNo` int NOT NULL,
  `dishId` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`orderNo`,`dishId`),
  KEY `orderDishId_idx` (`dishId`),
  CONSTRAINT `orderDishId` FOREIGN KEY (`dishId`) REFERENCES `dish` (`id`),
  CONSTRAINT `orderlistNo` FOREIGN KEY (`orderNo`) REFERENCES `order` (`billingNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  `SSN` int NOT NULL,
  `phone` int NOT NULL,
  `fName` varchar(45) NOT NULL,
  `lName` varchar(45) NOT NULL,
  UNIQUE KEY `SSN_UNIQUE` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (300000,123456,'Shaina','Rosell'),(300001,654321,'Jessie','Cai'),(300002,987654,'Brandon','Lu');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `FK_branchId` int NOT NULL,
  `resId` int NOT NULL,
  `guestCount` int DEFAULT NULL,
  `requestedTime` datetime DEFAULT NULL,
  `reservationSource` varchar(45) DEFAULT NULL,
  `custId` int NOT NULL,
  PRIMARY KEY (`FK_branchId`,`resId`,`custId`),
  UNIQUE KEY `resId_UNIQUE` (`resId`),
  KEY `custId_idx` (`custId`),
  CONSTRAINT `custId` FOREIGN KEY (`custId`) REFERENCES `customers` (`id`),
  CONSTRAINT `FK_branchId` FOREIGN KEY (`FK_branchId`) REFERENCES `branch` (`branchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,9,'2020-03-01 18:15:00','Online',10),(2,2,4,'2020-03-01 19:00:00','In Person',11),(2,15,18,'2019-07-10 18:00:00','Online',11),(3,3,6,'2020-03-01 17:00:00','In App',12),(3,8,10,'2019-04-01 17:00:00','Online',11),(4,4,5,'2020-03-01 20:00:00','Phone',12),(4,12,13,'2020-04-15 18:00:00','Phone',12);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `branchID` int NOT NULL,
  `DATE` date NOT NULL,
  `total` float NOT NULL,
  `profit` float NOT NULL,
  `loss` float NOT NULL,
  `fake_revenue_key` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`fake_revenue_key`),
  KEY `branchID_r_idx` (`branchID`),
  CONSTRAINT `branchID_r` FOREIGN KEY (`branchID`) REFERENCES `branch` (`branchID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES (1,'2019-03-01',15000,8000,7000,1),(2,'2019-03-02',32000,30000,2000,2),(2,'2019-07-01',36000,20000,16000,3);
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping routines for database 'restaurantdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `addDishtoOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addDishtoOrder`(orderNo int, dishId int, qty int)
BEGIN
	INSERT INTO order_list SET `orderNo` = orderNo, `dishId` = dishId, `qty` = qty;
    
    /* update the total bill of this order*/
    UPDATE restaurantdb.order
	SET restaurantdb.order.billAmount = restaurantdb.order.billAmount + (qty *(SELECT dish.price
						FROM dish
						where dish.id = dishId))
	where restaurantdb.order.billingNo = orderNo;
    
    /* update the numOfOrders of this dish */
    UPDATE dish
    SET dish.numOfOrders = dish.numOfOrders + (1 * qty)
    WHERE dish.id = dishId;
    
    /* return the order of this dish from the order_list */
    SELECT orderNo, dishId, name, qty 
    FROM order_list, dish 
    where order_list.orderNo = orderNo and order_list.dishId = dish.id and dish.id = dishId;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteDishOrder` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteDishOrder`(orderNo int, dishId int)
BEGIN
	/* update the total bill of this order*/
    UPDATE restaurantdb.order
	SET restaurantdb.order.billAmount = 
    restaurantdb.order.billAmount - ((SELECT qty FROM order_list where order_list.orderNo = orderNo and order_list.dishId = dishId) *(SELECT dish.price
						FROM dish
						where dish.id = dishId))
	where restaurantdb.order.billingNo = orderNo;
    
	/* update the numOfOrders of this dish */
    UPDATE dish
    SET dish.numOfOrders = dish.numOfOrders - (1 * (SELECT qty FROM order_list where order_list.orderNo = orderNo and order_list.dishId = dishId))
    WHERE dish.id = dishId; 
  
	/* finally, delete this dish entry from the order_list */
	DELETE
	FROM order_list
	where order_list.orderNo = orderNo and order_list.dishId = dishId;   
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllOrdersbyID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllOrdersbyID`(custID Int)
BEGIN
SELECT * FROM restaurantdb.order
where customerId = custID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateDish` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateDish`(dishId int, changeName varchar(50), descript varchar(500), quantityMade int, price int, numOfOrders int)
BEGIN
	if (changeName is not null) then
		UPDATE dish SET dish.name = changeName where dish.id = dishId;
	end if;
	if (descript is not null) then
		UPDATE dish SET dish.description = descript where dish.id = dishId;
	end if;
	if (quantityMade is not null) then
		UPDATE dish SET dish.quantityMade = quantityMade where dish.id = dishId;
	end if;
	if (price is not null) then
		UPDATE dish SET dish.price = price where dish.id = dishId;
	end if;
	if (numOfOrders is not null) then
		UPDATE dish SET dish.numOfOrders = numOfOrders where dish.id = dishId;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateMember`(cardId Int, tier int, points int, lastUsed date)
BEGIN
	if (tier is not null) then
		UPDATE membership SET membership.tier = tier where membership.cardId = cardId;
	end if;
	if (points is not null) then
		UPDATE membership SET membership.points = points where membership.cardId = cardId;
	end if;
	if (lastUsed is not null) then
		UPDATE membership SET membership.lastUsed = lastUsed where membership.cardId = cardId;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-14 13:50:19

