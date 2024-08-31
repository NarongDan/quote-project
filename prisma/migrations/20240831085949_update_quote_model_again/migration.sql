/*
  Warnings:

  - You are about to drop the column `author` on the `quote` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `quote` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `quote` DROP FOREIGN KEY `Quote_createdById_fkey`;

-- AlterTable
ALTER TABLE `quote` DROP COLUMN `author`,
    DROP COLUMN `createdById`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `authorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `Quote_authorId_idx` ON `Quote`(`authorId`);

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
