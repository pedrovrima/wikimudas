/*
  Warnings:

  - Added the required column `sex` to the `Sex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sex` ADD COLUMN `sex` ENUM('Male', 'Female', 'Undertemined') NOT NULL;
