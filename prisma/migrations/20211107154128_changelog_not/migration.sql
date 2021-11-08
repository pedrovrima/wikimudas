-- DropForeignKey
ALTER TABLE `Species` DROP FOREIGN KEY `Species_changeId_fkey`;

-- AlterTable
ALTER TABLE `Species` MODIFY `changeId` INTEGER;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
