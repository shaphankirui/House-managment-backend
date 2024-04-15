-- AlterTable
ALTER TABLE "houses" ADD COLUMN     "UtilitiesSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interiorDetailsSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otherFeaturesSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "outdoorDetailsSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pictureUrlSet" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "is_open" DROP NOT NULL;
