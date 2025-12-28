CREATE TABLE IF NOT EXISTS "df_music" (
	"id" INTEGER NOT NULL UNIQUE,
	"title" VARCHAR NOT NULL,
	"artist" VARCHAR,
	"album" VARCHAR,
	"cover" TEXT,
	"blob" BLOB,
	"filename" VARCHAR,
	"filetype" VARCHAR,
	"source" INTEGER NOT NULL,
	"created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id")
);