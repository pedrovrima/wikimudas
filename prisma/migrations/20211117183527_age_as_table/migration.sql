/*
  Warnings:

  - You are about to drop the column `age` on the `Ages` table. All the data in the column will be lost.
  - Added the required column `ageId` to the `Ages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ages` DROP COLUMN `age`,
    ADD COLUMN `ageId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `AgeOptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age_type` VARCHAR(191) NOT NULL,
    `pt_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_ageId_fkey` FOREIGN KEY (`ageId`) REFERENCES `AgeOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
