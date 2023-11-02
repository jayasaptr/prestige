-- CreateTable
CREATE TABLE `car_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_name` VARCHAR(100) NOT NULL,
    `car_category` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `car_year` INTEGER UNSIGNED NOT NULL,
    `price` INTEGER UNSIGNED NULL,
    `active_status` VARCHAR(100) NULL,
    `available_status` VARCHAR(100) NULL,
    `description` TEXT NULL,
    `feature` VARCHAR(255) NULL,
    `extra_charge` VARCHAR(255) NULL,
    `police_number` VARCHAR(10) NOT NULL,
    `car_status` VARCHAR(100) NOT NULL,
    `car_image` VARCHAR(255) NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_picture` VARCHAR(255) NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `email_customer` VARCHAR(100) NOT NULL,
    `password_customer` VARCHAR(100) NOT NULL,
    `emergency_contact` VARCHAR(100) NULL,
    `official_identify` VARCHAR(255) NULL,
    `phone_number` VARCHAR(100) NOT NULL,
    `country_customer` VARCHAR(100) NULL,
    `state_customer` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `driver_license_number` INTEGER NULL,
    `expiration_date` DATE NULL,
    `date_of_birth` DATE NULL,
    `status` VARCHAR(100) NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `customers_email_customer_unique`(`email_customer`),
    UNIQUE INDEX `customers_password_customer_unique`(`password_customer`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver_goals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `advance_goal_id` INTEGER NOT NULL,
    `minimum_duration_id` INTEGER NOT NULL,
    `maximum_duration_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `advance_goal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `advance_goal` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minimum_duration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `minimum_duration` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maximum_duration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maximum_duration` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination_name` VARCHAR(100) NOT NULL,
    `destination_icon` VARCHAR(255) NOT NULL,
    `destination_headline` VARCHAR(255) NOT NULL,
    `destination_description` LONGTEXT NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination_abouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination_id` INTEGER NOT NULL,
    `destination_about_title` VARCHAR(100) NOT NULL,
    `destination_about_description` LONGTEXT NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination_contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination_id` INTEGER NOT NULL,
    `destination_content_title` VARCHAR(100) NOT NULL,
    `destination_content_image` VARCHAR(255) NOT NULL,
    `destination_content_description` LONGTEXT NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extra_charges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `information` TEXT NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `failed_jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `connection` TEXT NOT NULL,
    `queue` TEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `exception` LONGTEXT NOT NULL,
    `failed_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `features` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `information` TEXT NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_access_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenable_type` VARCHAR(255) NOT NULL,
    `tokenable_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `abilities` TEXT NULL,
    `last_used_at` TIMESTAMP(0) NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `personal_access_tokens_token_unique`(`token`),
    INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tax_value` VARCHAR(100) NOT NULL,
    `delete_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP(0) NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `driver_goals` ADD CONSTRAINT `driver_goals_advance_goal_id_fkey` FOREIGN KEY (`advance_goal_id`) REFERENCES `advance_goal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver_goals` ADD CONSTRAINT `driver_goals_minimum_duration_id_fkey` FOREIGN KEY (`minimum_duration_id`) REFERENCES `minimum_duration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver_goals` ADD CONSTRAINT `driver_goals_maximum_duration_id_fkey` FOREIGN KEY (`maximum_duration_id`) REFERENCES `maximum_duration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver_goals` ADD CONSTRAINT `driver_goals_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
