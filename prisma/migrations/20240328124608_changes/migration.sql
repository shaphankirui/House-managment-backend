-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL,
    "fileUrl" TEXT,
    "pictureUrl" TEXT[],
    "country" TEXT,
    "county" TEXT,
    "mapAdress" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "interiorDetails" TEXT[],
    "outdoorDetails" TEXT[],
    "Utilities" TEXT[],
    "otherFeatures" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
