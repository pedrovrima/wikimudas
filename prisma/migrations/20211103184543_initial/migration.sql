-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PictureReference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pictureId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `authors` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `primaries` INTEGER NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Species` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genus` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `pt_name` VARCHAR(191) NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Strategy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `strategy` ENUM('CBS', 'CAS', 'SBS', 'SAS') NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skull` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Molts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `molt` ENUM('FPJ', 'FPF', 'FPA', 'DPB', 'DPA') NOT NULL,
    `extension` ENUM('Absent', 'Limited', 'Partial', 'Incomplete', 'Eccentric', 'Complete') NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoltLimits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `type` ENUM('g_covs', 'versus', 'alula', 'primaries', 'secondaries', 'pp_covs', 'tail', 'among_covs') NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ageId` INTEGER NOT NULL,
    `tract` ENUM('crown', 'bill', 'iris', 'greater_coverts', 'lesser_coverts', 'median_covers', 'secondaries', 'primaries') NOT NULL,
    `characteristics` VARCHAR(191) NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,
    `referenceId` INTEGER NOT NULL,
    `pictureReferenceId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciesId` INTEGER NOT NULL,
    `age` ENUM('FCJ', 'FAJ', 'FCF', 'FCA', 'SCB', 'SAB', 'SCA', 'TCB', 'TAB', 'TCA', 'QCB', 'QAB', 'QCA', 'CCB', 'CAB', 'CCA') NOT NULL,
    `changeId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL,
    `oldId` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChangeLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `editorId` INTEGER,
    `table` VARCHAR(191) NOT NULL,
    `row_id` INTEGER,
    `status` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL,
    `type` ENUM('CREATE', 'DELETE', 'UPDATE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PictureReference` ADD CONSTRAINT `PictureReference_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD CONSTRAINT `Family_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD CONSTRAINT `Family_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Family` ADD CONSTRAINT `Family_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Strategy` ADD CONSTRAINT `Strategy_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Strategy` ADD CONSTRAINT `Strategy_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Strategy` ADD CONSTRAINT `Strategy_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Strategy` ADD CONSTRAINT `Strategy_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skull` ADD CONSTRAINT `Skull_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skull` ADD CONSTRAINT `Skull_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skull` ADD CONSTRAINT `Skull_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skull` ADD CONSTRAINT `Skull_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Molts` ADD CONSTRAINT `Molts_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Molts` ADD CONSTRAINT `Molts_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Molts` ADD CONSTRAINT `Molts_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Molts` ADD CONSTRAINT `Molts_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoltLimits` ADD CONSTRAINT `MoltLimits_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sex` ADD CONSTRAINT `Sex_ageId_fkey` FOREIGN KEY (`ageId`) REFERENCES `Ages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sex` ADD CONSTRAINT `Sex_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sex` ADD CONSTRAINT `Sex_referenceId_fkey` FOREIGN KEY (`referenceId`) REFERENCES `Reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sex` ADD CONSTRAINT `Sex_pictureReferenceId_fkey` FOREIGN KEY (`pictureReferenceId`) REFERENCES `PictureReference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_speciesId_fkey` FOREIGN KEY (`speciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ages` ADD CONSTRAINT `Ages_changeId_fkey` FOREIGN KEY (`changeId`) REFERENCES `ChangeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChangeLogs` ADD CONSTRAINT `ChangeLogs_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChangeLogs` ADD CONSTRAINT `ChangeLogs_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
