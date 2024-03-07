-- CreateTable
CREATE TABLE "SleepPattern" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SleepPattern_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SleepPattern" ADD CONSTRAINT "SleepPattern_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
