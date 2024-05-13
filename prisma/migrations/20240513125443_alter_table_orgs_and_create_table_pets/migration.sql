/*
  Warnings:

  - You are about to drop the column `address` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `author_name` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetEnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "address",
DROP COLUMN "password_hash",
DROP COLUMN "phone",
ADD COLUMN     "author_name" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL,
ALTER COLUMN "zip_code" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy_level" "PetEnergyLevel" NOT NULL,
    "environment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_Id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_Id_fkey" FOREIGN KEY ("org_Id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
