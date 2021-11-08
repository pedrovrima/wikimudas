-- AlterTable
ALTER TABLE `Ages` ADD COLUMN `pictureReferenceId` INTEGER,
    ADD COLUMN `referenceId` INTEGER;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
