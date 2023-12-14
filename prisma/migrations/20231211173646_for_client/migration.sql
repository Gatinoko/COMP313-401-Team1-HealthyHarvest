/*
  Warnings:

  - You are about to drop the column `public` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `yield` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `direction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `yieldAmount` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servings` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prepTime` on table `recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cookTime` on table `recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `direction` DROP FOREIGN KEY `Direction_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `Ingredient_recipeId_fkey`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `public`,
    DROP COLUMN `yield`,
    ADD COLUMN `directions` VARCHAR(191) NULL,
    ADD COLUMN `ingredients` VARCHAR(191) NULL,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `yieldAmount` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `servings` INTEGER NOT NULL,
    MODIFY `prepTime` VARCHAR(191) NOT NULL,
    MODIFY `cookTime` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `direction`;

-- DropTable
DROP TABLE `ingredient`;
