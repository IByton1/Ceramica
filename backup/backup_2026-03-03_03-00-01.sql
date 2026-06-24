-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: Ceramica
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory_items`
--

DROP TABLE IF EXISTS `inventory_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shelf` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_items`
--

LOCK TABLES `inventory_items` WRITE;
/*!40000 ALTER TABLE `inventory_items` DISABLE KEYS */;
INSERT INTO `inventory_items` VALUES (28,'Fricke Marko','8',1),(75,'Fa Ceramica Matt','11',1),(97,'Jens B.Wallner','8',3),(103,'Benkenstein Morgner','8',1),(116,'Benkenstein 1395x2200','8',1),(126,'Streuber','8',2),(129,'Schmidt, Ilona','10',2),(140,'Berka Klaus ','3',3),(143,'Streuber Phillip','8',2),(150,'BV Hammer Jens','5',2),(151,'BV Kaufmann Mandy','3',2),(153,'Berger Andre','5',1),(155,'Metzner Klaus DG ','6',3),(156,'BV Birgit Ludwig ','10',2),(157,'Hagedorn DG','4',4),(158,'Schwarzer Bär Ersatz ','10',1),(159,'Schreyer Mirko ','6',3),(161,'BV Neugasse 38 Ersatz ','3',1),(163,'Weber BV Juknischke Ersatz','2',2),(164,'JW BV Steingrüber','2',1),(165,'Gottschalk Ersatz','11',1);
/*!40000 ALTER TABLE `inventory_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-03  3:00:01
