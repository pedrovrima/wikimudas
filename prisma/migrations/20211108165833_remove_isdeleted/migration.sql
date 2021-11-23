/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `AgeSexTraits` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Ages` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Family` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `MoltLimits` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Molts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Sex` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Skull` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Species` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Strategy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AgeSexTraits` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Ages` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Family` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `MoltLimits` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Molts` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Reference` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Sex` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Skull` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Species` DROP COLUMN `isDeleted`;

-- AlterTable
ALTER TABLE `Strategy` DROP COLUMN `isDeleted`;
