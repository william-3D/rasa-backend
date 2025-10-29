/*
  Warnings:

  - The primary key for the `Allergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Condition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FavoriteRecipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeAllergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RecipeCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserAllergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeAllergy" DROP CONSTRAINT "RecipeAllergy_allergyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeAllergy" DROP CONSTRAINT "RecipeAllergy_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeCondition" DROP CONSTRAINT "RecipeCondition_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeCondition" DROP CONSTRAINT "RecipeCondition_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAllergy" DROP CONSTRAINT "UserAllergy_allergyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAllergy" DROP CONSTRAINT "UserAllergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCondition" DROP CONSTRAINT "UserCondition_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCondition" DROP CONSTRAINT "UserCondition_userId_fkey";

-- AlterTable
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Allergy_id_seq";

-- AlterTable
ALTER TABLE "Condition" DROP CONSTRAINT "Condition_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Condition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Condition_id_seq";

-- AlterTable
ALTER TABLE "FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "recipeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("userId", "recipeId");

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recipe_id_seq";

-- AlterTable
ALTER TABLE "RecipeAllergy" DROP CONSTRAINT "RecipeAllergy_pkey",
ALTER COLUMN "recipeId" SET DATA TYPE TEXT,
ALTER COLUMN "allergyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeAllergy_pkey" PRIMARY KEY ("recipeId", "allergyId");

-- AlterTable
ALTER TABLE "RecipeCondition" DROP CONSTRAINT "RecipeCondition_pkey",
ALTER COLUMN "recipeId" SET DATA TYPE TEXT,
ALTER COLUMN "conditionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecipeCondition_pkey" PRIMARY KEY ("recipeId", "conditionId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "allergyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("userId", "allergyId");

-- AlterTable
ALTER TABLE "UserCondition" DROP CONSTRAINT "UserCondition_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "conditionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCondition_pkey" PRIMARY KEY ("userId", "conditionId");

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCondition" ADD CONSTRAINT "UserCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCondition" ADD CONSTRAINT "RecipeCondition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCondition" ADD CONSTRAINT "RecipeCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeAllergy" ADD CONSTRAINT "RecipeAllergy_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeAllergy" ADD CONSTRAINT "RecipeAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
