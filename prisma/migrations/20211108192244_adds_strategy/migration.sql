/*
  Warnings:

  - Added the required column `strategy` to the `Strategy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Strategy` ADD COLUMN `strategy` ENUM('CBS', 'CAS', 'SBS', 'SAS') NOT NULL;
