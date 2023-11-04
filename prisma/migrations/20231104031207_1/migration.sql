/*
  Warnings:

  - You are about to drop the column `customer_id` on the `car_availability` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `driver_goals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `car_availability` DROP FOREIGN KEY `car_availability_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `driver_goals` DROP FOREIGN KEY `driver_goals_customer_id_fkey`;

-- AlterTable
ALTER TABLE `car_availability` DROP COLUMN `customer_id`;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `car_availability_id` INTEGER NULL,
    ADD COLUMN `driver_goals_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `driver_goals` DROP COLUMN `customer_id`;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_driver_goals_id_fkey` FOREIGN KEY (`driver_goals_id`) REFERENCES `driver_goals`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_car_availability_id_fkey` FOREIGN KEY (`car_availability_id`) REFERENCES `car_availability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
