/*
  Warnings:

  - You are about to drop the column `characteristics` on the `Sex` table. All the data in the column will be lost.
  - You are about to drop the column `tract` on the `Sex` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Sex` DROP COLUMN `characteristics`,
    DROP COLUMN `tract`;

-- CreateTable
CREATE TABLE `AgeSexTraits` (
    `tractId` INTEGER NOT NULL,
    `characteristics` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sexId` INTEGER NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tracts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pt_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_tractId_fkey` FOREIGN KEY (`tractId`) REFERENCES `Tracts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
