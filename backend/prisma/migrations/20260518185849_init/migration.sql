-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "materiaux" TEXT NOT NULL,
    "origine" TEXT NOT NULL,
    "scoreConformite" REAL NOT NULL,
    "qrCodeUrl" TEXT,
    "txHashBlockchain" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
