/*
  Warnings:

  - You are about to drop the column `fundName` on the `Holding` table. All the data in the column will be lost.
  - Added the required column `fundId` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "fundName",
ADD COLUMN     "fundId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
