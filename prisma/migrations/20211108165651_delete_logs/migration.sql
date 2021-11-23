-- AlterTable
ALTER TABLE `AgeSexTraits` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Ages` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Family` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `MoltLimits` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Molts` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Reference` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Sex` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Skull` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Species` ADD COLUMN `deleteLogsId` INTEGER;

-- AlterTable
ALTER TABLE `Strategy` ADD COLUMN `deleteLogsId` INTEGER;

-- CreateTable
CREATE TABLE `DeleteLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `editorId` INTEGER,
    `table` VARCHAR(191) NOT NULL,
    `row_id` INTEGER,
    `status` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `type` ENUM('CREATE', 'DELETE', 'UPDATE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD CONSTRAINT `Family_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Strategy` ADD CONSTRAINT `Strategy_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skull` ADD CONSTRAINT `Skull_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Molts` ADD CONSTRAINT `Molts_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sex` ADD CONSTRAINT `Sex_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgeSexTraits` ADD CONSTRAINT `AgeSexTraits_deleteLogsId_fkey` FOREIGN KEY (`deleteLogsId`) REFERENCES `DeleteLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteLogs` ADD CONSTRAINT `DeleteLogs_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeleteLogs` ADD CONSTRAINT `DeleteLogs_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
