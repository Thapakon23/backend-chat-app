# ************************************************************
# Sequel Ace SQL dump
# Version 20050
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.5.5-10.11.3-MariaDB)
# Database: real_time_chat
# Generation Time: 2023-08-15 15:27:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table friend_requests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `friend_requests`;

CREATE TABLE `friend_requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `requester_id` char(5) NOT NULL,
  `receiver_id` char(5) NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`request_id`),
  KEY `request` (`requester_id`),
  KEY `receive` (`receiver_id`),
  CONSTRAINT `receive` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request` FOREIGN KEY (`requester_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;

INSERT INTO `friend_requests` (`request_id`, `requester_id`, `receiver_id`, `status`)
VALUES
	(1,'U0001','U0002','accepted'),
	(2,'U0002','U0003','accepted');

/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table friends
# ------------------------------------------------------------

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(5) NOT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `user_friends` (`user_id`),
  CONSTRAINT `user_friends` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;

INSERT INTO `friends` (`friend_id`, `user_id`)
VALUES
	(2,'U0001'),
	(1,'U0002');

/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `message_id` char(5) NOT NULL,
  `sender_id` char(5) NOT NULL,
  `message_text` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `send_time` timestamp NOT NULL,
  `read_status` tinyint(1) DEFAULT 0,
  `read_time` timestamp NULL DEFAULT NULL,
  `receiver_id` char(5) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender` (`sender_id`),
  KEY `receiver` (`receiver_id`),
  CONSTRAINT `receiver` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`message_id`, `sender_id`, `message_text`, `send_time`, `read_status`, `read_time`, `receiver_id`)
VALUES
	('M0001','U0001','Hello, This is my first real-time message app.','2023-08-11 15:46:52',0,NULL,'U0002'),
	('M0002','U0002','Hello, my name is Thapakon Kamujandee.','2023-08-11 16:06:30',1,NULL,'U0001'),
	('M0003','U0002','I love you.','2023-08-11 22:42:01',0,NULL,'U0003'),
	('M0004','U0002','What are you doing?','2023-08-11 22:55:03',0,NULL,'U0001'),
	('M0005','U0001','I am developing app.','2023-08-11 23:22:10',0,NULL,'U0002'),
	('M0006','U0002','How\'s it going?','2023-08-12 01:59:25',0,NULL,'U0001'),
	('M0007','U0001','I don\'t know. I still get an error. I think I have to ask ChatGPT.','2023-08-12 02:10:10',0,NULL,'U0002'),
	('M0008','U0002','Try it','2023-08-13 00:17:16',0,NULL,'U0001'),
	('M0009','U0002','Does it work?','2023-08-13 00:18:58',0,NULL,'U0001'),
	('M0010','U0001','Yes it works.','2023-08-13 00:41:02',0,NULL,'U0002'),
	('M0011','U0002','Okay!','2023-08-13 00:41:33',0,NULL,'U0001');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` char(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`user_id`, `username`, `password`, `status`)
VALUES
	('U0001','Thapakon','$2b$10$ZkUs6HwTj6gJDLd9/yTBPew/nJ0/QZdsZO4cYYT5rIWIt7V34Y7zW',NULL),
	('U0002','23Thapakon','$2b$10$PgN0b6FY.Lgoxtv041gy9uXPe8zmxF3NA9kU2GbIxTPeUy1iooHpq',NULL),
	('U0003','Puployyy','$2b$10$wMBuffQahqtK.Sm9CTdP7em1xYIb2xHOoeNJmxMw3xclJWFYwOR3.',NULL),
	('U0004','Test1234','$2b$10$hdydVvWYir.Bgb8AQZWX2OpTeOZGUjkzb/wO7PQwRPJCzQA1l/fcG',NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
