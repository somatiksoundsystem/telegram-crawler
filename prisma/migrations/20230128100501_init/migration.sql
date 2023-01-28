-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegram_id" BIGINT NOT NULL,
    "text" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "signature" TEXT,
    "date" DATETIME NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_unique_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    CONSTRAINT "Photo_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_telegram_id_key" ON "Post"("telegram_id");
