/*
  Warnings:

  - You are about to drop the column `massage` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `faforites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "faforites" DROP CONSTRAINT "faforites_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "massage",
ADD COLUMN     "message" TEXT NOT NULL;

-- DropTable
DROP TABLE "faforites";

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
