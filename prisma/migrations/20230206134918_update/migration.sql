/*
  Warnings:

  - You are about to drop the column `html` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `html`,
    DROP COLUMN `text`,
    MODIFY `content` JSON NOT NULL;
