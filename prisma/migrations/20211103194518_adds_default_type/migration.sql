/*
  Warnings:

  - You are about to drop the column `pictureReferenceId` on the `Species` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `Species` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Species` DROP FOREIGN KEY `Species_pictureReferenceId_fkey`;

-- DropForeignKey
ALTER TABLE `Species` DROP FOREIGN KEY `Species_referenceId_fkey`;

-- AlterTable
ALTER TABLE `ChangeLogs` MODIFY `status` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `Species` DROP COLUMN `pictureReferenceId`,
    DROP COLUMN `referenceId`;
