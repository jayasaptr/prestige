-- CreateTable
CREATE TABLE `car_availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primary_financial_goal_id` INTEGER NOT NULL,
    `how_often_family_id` INTEGER NOT NULL,
    `how_often_car_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `primary_financial_goal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `primary_financial_goal` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `how_often_family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `how_often_family` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `how_often_car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `how_often_car` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `car_availability` ADD CONSTRAINT `car_availability_primary_financial_goal_id_fkey` FOREIGN KEY (`primary_financial_goal_id`) REFERENCES `primary_financial_goal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `car_availability` ADD CONSTRAINT `car_availability_how_often_family_id_fkey` FOREIGN KEY (`how_often_family_id`) REFERENCES `how_often_family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `car_availability` ADD CONSTRAINT `car_availability_how_often_car_id_fkey` FOREIGN KEY (`how_often_car_id`) REFERENCES `how_often_car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `car_availability` ADD CONSTRAINT `car_availability_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
