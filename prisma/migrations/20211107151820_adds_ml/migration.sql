/*
  Warnings:

  - You are about to drop the column `type` on the `MoltLimits` table. All the data in the column will be lost.
  - You are about to drop the column `strategy` on the `Strategy` table. All the data in the column will be lost.
  - Added the required column `moltLimitId` to the `MoltLimits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MoltLimits` DROP COLUMN `type`,
    ADD COLUMN `moltLimitId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Strategy` DROP COLUMN `strategy`;

-- CreateTable
CREATE TABLE `MoltLimitOptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `molt_limit_type` VARCHAR(191) NOT NULL,
    `pt_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_moltLimitId_fkey` FOREIGN KEY (`moltLimitId`) REFERENCES `MoltLimitOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
