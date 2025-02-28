-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: pizza
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pro_Id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pro_name` varchar(500) NOT NULL,
  `pro_desc` text,
  `pro_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pro_Id`),
  UNIQUE KEY `pro_name` (`pro_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('11f94cb9-236b-4367-8afc-f1e38e415077','CHEESY CHICKEN BACON - PIZZA GÀ PHÔ MAI THỊT HEO XÔNG KHÓI','Gà tươi mọng nướng, với lớp vỏ ngoài vàng óng được phô mai Mozzarella bao bọc giúp bánh không bị khô sau khi nướng, và những miếng thịt xông khói mặn mặn trung hòa với vị ngọt béo từ phô mai, khiến cho hương vị hài hòa hơn tất thảy. Từng hương vị hòa quyện với nhau, dù đối lập nhau nhưng không triệt tiêu lẫn nhau, mà giúp pizza đỡ ngán để giữ được vị thơm béo đặc trưng.','uploads/cheese-chicken-bacon.png','2025-02-27 08:54:15','2025-02-27 08:54:15'),('1d540a22-634f-427f-b19f-461c2adb0779','VEGGIE MANIA - PIZZA CHAY','PIZZA CHAY với sự hòa trộn hương vị rau củ vô cùng độc đáo. Vị ngọt thanh của hành tây, nấm mỡ và thơm, vị hơi cay cay của những miếng ớt chuông giòn rụm cùng vị chua từ những miếng cà chua đỏ au trên miếng bánh. Sự lựa chọn cực chất mà bạn nhất định không thể bỏ qua cho những ngày ăn chay!','uploads/veggie-mania.png','2025-02-27 09:00:14','2025-02-27 09:00:14'),('279306c4-42c6-4847-8ed0-18028c78cf72','TERIYAKI CHICKEN - GÀ XỐT TƯƠNG KIỂU NHẬT','Từng miếng thịt gà trắng bùi xen kẽ với những miếng nấm mỡ và hành tây vừa thơm vừa ngọt, nằm gọn trên lớp phô mai Mozzarella beo béo đi kèm với sốt Mayonnaise và Teriyaki trứ danh từ nền ẩm thực Nhật Bản!','uploads/teriyaki-chicken2-full.png','2025-02-27 08:59:09','2025-02-27 08:59:09'),('4fe56b8b-853e-40a1-9437-c66ef0c58efb','PRIME BEEF - PIZZA BÒ THƯỢNG HẠNG','Thịt bò lại ăn kèm phô mai Mozzarella thơm béo, hòa quyện cùng 2 loại sốt Cà Chua và Phô Mai thì còn gì bằng. Thịt ngập trong đủ loại sốt và phô mai, chỉ muốn nuốt trọn cả chiếc bánh!!','uploads/prime-beef-full.png','2025-02-27 08:58:09','2025-02-27 08:58:09'),('55a61f8c-5524-4b5f-99a0-207172d20e4f','HAWAIIAN - PIZZA KIỂU HAWAII','Dăm bông ăn với dứa chua chua ngọt ngọt kèm phô mai Mozzarella dai dai beo béo quyện cùng vị chua nhẹ thơm phức của sốt cà chua - Hương vị của Hawaii gói gọn trong chiếc bánh pizza to tròn đầy nhân ú ụ.','uploads/hawaii-full.png','2025-02-27 08:52:20','2025-02-27 08:52:20'),('a8af1bfa-958f-4cf3-afec-b15ab2c41f6b','KID MANIA - PIZZA CHO BẠN NHỎ','Pizza của sự hòa quyện chất lừ: Ngọt từ Bắp, béo thơm từ Trứng Cút & Thịt heo muối thơm ngậy từ phô mai Mozzarella tạo nên bữa tiệc như nắng mùa hè. Cắn một miếng là ngọt tận tâm can. Hương vị mà cả già trẻ lẫn bé đều không thể ngó lơ!','uploads/kid-mania-full.png','2025-02-27 08:55:11','2025-02-27 08:55:11'),('e3174814-2804-4bef-af58-01c844a20459','CHEESE MANIA - PIZZA PHÔ MAI','Chiếc pizza đặc trưng cổ điển cho bất cứ tín đồ pizza nào. Tầng trên là lớp phô mai vàng óng thơm dẻo như mời gọi, tầng dưới là lớp sốt cà chua trung hòa với vị béo của phô mai Mozarella giúp chiếc pizza không bị ngấy.','uploads/cheese-mania.png','2025-02-27 08:53:22','2025-02-27 08:53:22'),('fa9d0c2a-06a8-4afb-96d7-444f666a4185','PIZZA HẢI SẢN KIỂU SINGAPORE','Ngập tràn trong hải sản, từ tôm tươi mọng nước, thịt cua ngọt bùi đi kèm phô mai Mozzarella thơm béo cùng sốt Singapore cay cay được đằm vị bởi hành tây nướng thơm ngọt, tạo nên bữa tiệc hương vị khó quên.','uploads/sing-seafood2-full.png','2025-02-27 08:57:24','2025-02-27 08:57:24');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-28  6:59:47
