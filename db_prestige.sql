/*
 Navicat Premium Data Transfer

 Source Server         : db_jaya
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : db_prestige

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 03/11/2023 11:59:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
BEGIN;
INSERT INTO `_prisma_migrations` VALUES ('066fb149-2cac-4c52-9183-469178756a8e', '059de3c62d96c42d3522e5cf71aa6a91baa57c8db8e2266f4af1b2aca389a27b', '2023-11-01 08:15:49.304', '20231101081549_1', NULL, NULL, '2023-11-01 08:15:49.279', 1);
INSERT INTO `_prisma_migrations` VALUES ('62f71826-a525-4e1e-850e-d36a0eb83671', '8097e652ea70236f6b061df03189fd95901f0619e21718cb0227f97218809d49', '2023-11-01 08:26:46.239', '20231101082646_1', NULL, NULL, '2023-11-01 08:26:46.101', 1);
INSERT INTO `_prisma_migrations` VALUES ('952097cd-8b9e-4645-9a6d-49ee68199ff5', '8e034ec0016d4747274d95f74ab5c3092e7b1b04cdc57190a037d43b18d9c2f5', '2023-11-01 07:38:53.926', '20231101073853_1', NULL, NULL, '2023-11-01 07:38:53.675', 1);
INSERT INTO `_prisma_migrations` VALUES ('cbf6bff1-db15-4b76-9396-1f350705f008', 'ffd1131280be04482c73a808fdcf9c8db4f74a18430259a8a4fd401dd0252bfd', '2023-11-01 07:55:28.254', '20231101075528_1', NULL, NULL, '2023-11-01 07:55:28.217', 1);
COMMIT;

-- ----------------------------
-- Table structure for advance_goal
-- ----------------------------
DROP TABLE IF EXISTS `advance_goal`;
CREATE TABLE `advance_goal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `advance_goal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of advance_goal
-- ----------------------------
BEGIN;
INSERT INTO `advance_goal` VALUES (1, '1 Hours', '2023-11-01 08:51:01.019', '2023-11-01 08:50:42.224');
INSERT INTO `advance_goal` VALUES (2, '3 Hours', '2023-11-01 08:51:01.019', '2023-11-01 08:50:45.072');
INSERT INTO `advance_goal` VALUES (3, '6 Hours', '2023-11-01 08:51:01.019', '2023-11-01 08:50:51.358');
INSERT INTO `advance_goal` VALUES (4, '12 Hours (recomended)', '2023-11-01 08:51:01.019', '2023-11-01 08:50:55.198');
INSERT INTO `advance_goal` VALUES (5, '18 Hours', '2023-11-01 08:51:01.019', '2023-11-01 08:50:58.817');
COMMIT;

-- ----------------------------
-- Table structure for car_availability
-- ----------------------------
DROP TABLE IF EXISTS `car_availability`;
CREATE TABLE `car_availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `primary_financial_goal_id` int NOT NULL,
  `how_often_family_id` int NOT NULL,
  `how_often_car_id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `car_availability_primary_financial_goal_id_fkey` (`primary_financial_goal_id`),
  KEY `car_availability_how_often_family_id_fkey` (`how_often_family_id`),
  KEY `car_availability_how_often_car_id_fkey` (`how_often_car_id`),
  KEY `car_availability_customer_id_fkey` (`customer_id`),
  CONSTRAINT `car_availability_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `car_availability_how_often_car_id_fkey` FOREIGN KEY (`how_often_car_id`) REFERENCES `how_often_car` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `car_availability_how_often_family_id_fkey` FOREIGN KEY (`how_often_family_id`) REFERENCES `how_often_family` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `car_availability_primary_financial_goal_id_fkey` FOREIGN KEY (`primary_financial_goal_id`) REFERENCES `primary_financial_goal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of car_availability
-- ----------------------------
BEGIN;
INSERT INTO `car_availability` VALUES (1, 2, 5, 2, '2023-11-01 08:54:40.403', '2023-11-01 08:54:40.403', 2);
COMMIT;

-- ----------------------------
-- Table structure for car_categories
-- ----------------------------
DROP TABLE IF EXISTS `car_categories`;
CREATE TABLE `car_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of car_categories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for cars
-- ----------------------------
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_category` int NOT NULL,
  `driver_id` int NOT NULL,
  `car_year` int unsigned NOT NULL,
  `price` int unsigned DEFAULT NULL,
  `active_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `feature` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extra_charge` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `police_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_status` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `car_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of cars
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_customer` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_customer` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emergency_contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `official_identify` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_customer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state_customer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `driver_license_number` int DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `status` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `driver_license_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_email_customer_unique` (`email_customer`),
  UNIQUE KEY `customers_password_customer_unique` (`password_customer`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
BEGIN;
INSERT INTO `customers` VALUES (2, 'storage/customers/photo_1698825913078.png', 'udin', NULL, 'joko', 'info.saput@gmail.com', '$2b$10$DSjD/DvgqzHLycMSdoqj7OQMHE3uOFTqRE0bDfdm8y75wsFsqajXO', NULL, NULL, '085651923925', 'Australia', 'Jawa', NULL, 12345678, '2022-12-20', '2002-12-22', 'Approved', NULL, NULL, NULL, 'storage/driver-license/photo_1698829494132.png');
COMMIT;

-- ----------------------------
-- Table structure for destination
-- ----------------------------
DROP TABLE IF EXISTS `destination`;
CREATE TABLE `destination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_headline` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of destination
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for destination_abouts
-- ----------------------------
DROP TABLE IF EXISTS `destination_abouts`;
CREATE TABLE `destination_abouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination_id` int NOT NULL,
  `destination_about_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_about_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of destination_abouts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for destination_contents
-- ----------------------------
DROP TABLE IF EXISTS `destination_contents`;
CREATE TABLE `destination_contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination_id` int NOT NULL,
  `destination_content_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_content_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_content_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of destination_contents
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for driver_goals
-- ----------------------------
DROP TABLE IF EXISTS `driver_goals`;
CREATE TABLE `driver_goals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `advance_goal_id` int NOT NULL,
  `minimum_duration_id` int NOT NULL,
  `maximum_duration_id` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `driver_goals_advance_goal_id_fkey` (`advance_goal_id`),
  KEY `driver_goals_minimum_duration_id_fkey` (`minimum_duration_id`),
  KEY `driver_goals_maximum_duration_id_fkey` (`maximum_duration_id`),
  KEY `driver_goals_customer_id_fkey` (`customer_id`),
  CONSTRAINT `driver_goals_advance_goal_id_fkey` FOREIGN KEY (`advance_goal_id`) REFERENCES `advance_goal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `driver_goals_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `driver_goals_maximum_duration_id_fkey` FOREIGN KEY (`maximum_duration_id`) REFERENCES `maximum_duration` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `driver_goals_minimum_duration_id_fkey` FOREIGN KEY (`minimum_duration_id`) REFERENCES `minimum_duration` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of driver_goals
-- ----------------------------
BEGIN;
INSERT INTO `driver_goals` VALUES (1, 2, 2, 2, '2023-11-01 08:55:07.236', '2023-11-01 08:55:07.236', 2);
COMMIT;

-- ----------------------------
-- Table structure for extra_charges
-- ----------------------------
DROP TABLE IF EXISTS `extra_charges`;
CREATE TABLE `extra_charges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `information` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of extra_charges
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for features
-- ----------------------------
DROP TABLE IF EXISTS `features`;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of features
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for how_often_car
-- ----------------------------
DROP TABLE IF EXISTS `how_often_car`;
CREATE TABLE `how_often_car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `how_often_car` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of how_often_car
-- ----------------------------
BEGIN;
INSERT INTO `how_often_car` VALUES (1, 'Never', '2023-11-01 08:49:03.787', '2023-11-01 08:49:01.028');
INSERT INTO `how_often_car` VALUES (2, 'Rarely', '2023-11-01 08:49:25.689', '2023-11-01 08:49:06.917');
INSERT INTO `how_often_car` VALUES (3, 'Somtimes', '2023-11-01 08:49:25.689', '2023-11-01 08:49:11.090');
INSERT INTO `how_often_car` VALUES (4, 'Often', '2023-11-01 08:49:25.689', '2023-11-01 08:49:17.990');
INSERT INTO `how_often_car` VALUES (5, 'Usually', '2023-11-01 08:49:25.689', '2023-11-01 08:49:29.648');
COMMIT;

-- ----------------------------
-- Table structure for how_often_family
-- ----------------------------
DROP TABLE IF EXISTS `how_often_family`;
CREATE TABLE `how_often_family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `how_often_family` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of how_often_family
-- ----------------------------
BEGIN;
INSERT INTO `how_often_family` VALUES (1, 'Never', '2023-11-01 08:50:20.535', '2023-11-01 08:49:49.736');
INSERT INTO `how_often_family` VALUES (2, 'Rarely', '2023-11-01 08:50:20.535', '2023-11-01 08:49:53.239');
INSERT INTO `how_often_family` VALUES (3, 'Somtimes', '2023-11-01 08:50:20.535', '2023-11-01 08:50:00.890');
INSERT INTO `how_often_family` VALUES (4, 'Often', '2023-11-01 08:50:20.535', '2023-11-01 08:50:06.141');
INSERT INTO `how_often_family` VALUES (5, 'Usually', '2023-11-01 08:50:20.535', '2023-11-01 08:50:12.027');
INSERT INTO `how_often_family` VALUES (6, 'Allways', '2023-11-01 08:50:20.535', '2023-11-01 08:50:16.831');
COMMIT;

-- ----------------------------
-- Table structure for maximum_duration
-- ----------------------------
DROP TABLE IF EXISTS `maximum_duration`;
CREATE TABLE `maximum_duration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `maximum_duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of maximum_duration
-- ----------------------------
BEGIN;
INSERT INTO `maximum_duration` VALUES (1, '1 Day', '2023-11-01 08:48:29.756', '2023-11-01 08:47:54.193');
INSERT INTO `maximum_duration` VALUES (2, '1 Week', '2023-11-01 08:48:29.756', '2023-11-01 08:48:06.062');
INSERT INTO `maximum_duration` VALUES (3, '1 Month (recomended)', '2023-11-01 08:48:29.756', '2023-11-01 08:48:11.910');
INSERT INTO `maximum_duration` VALUES (4, '1 Year', '2023-11-01 08:48:29.756', '2023-11-01 08:48:32.650');
COMMIT;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for minimum_duration
-- ----------------------------
DROP TABLE IF EXISTS `minimum_duration`;
CREATE TABLE `minimum_duration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minimum_duration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of minimum_duration
-- ----------------------------
BEGIN;
INSERT INTO `minimum_duration` VALUES (1, '1 Day (recomended)', '2023-11-01 08:51:55.167', '2023-11-01 08:51:38.241');
INSERT INTO `minimum_duration` VALUES (2, '1 Week', '2023-11-01 08:51:55.167', '2023-11-01 08:51:41.569');
INSERT INTO `minimum_duration` VALUES (3, '1 Month', '2023-11-01 08:51:55.167', '2023-11-01 08:51:48.047');
INSERT INTO `minimum_duration` VALUES (4, '1 Year', '2023-11-01 08:51:55.167', '2023-11-01 08:51:51.629');
COMMIT;

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for primary_financial_goal
-- ----------------------------
DROP TABLE IF EXISTS `primary_financial_goal`;
CREATE TABLE `primary_financial_goal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `primary_financial_goal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of primary_financial_goal
-- ----------------------------
BEGIN;
INSERT INTO `primary_financial_goal` VALUES (1, 'Cover your car payment', '2023-11-01 08:51:23.150', '2023-11-01 08:51:15.222');
INSERT INTO `primary_financial_goal` VALUES (2, 'Cover your family car payment', '2023-11-01 08:51:23.150', '2023-11-01 08:51:20.374');
COMMIT;

-- ----------------------------
-- Table structure for taxes
-- ----------------------------
DROP TABLE IF EXISTS `taxes`;
CREATE TABLE `taxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tax_value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delete_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of taxes
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'Udin Admin', 'udin@gmail.com', NULL, '$2a$10$luOO60BEf3SepumplbXpte2pbHyNkwhWul.DZfwQP8J7k9Jn7SpbO', NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
