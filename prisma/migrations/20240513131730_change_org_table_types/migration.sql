/*
  Warnings:

  - Changed the type of `zip_code` on the `orgs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `whatsapp` on the `orgs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "zip_code",
ADD COLUMN     "zip_code" INTEGER NOT NULL,
DROP COLUMN "whatsapp",
ADD COLUMN     "whatsapp" INTEGER NOT NULL;
