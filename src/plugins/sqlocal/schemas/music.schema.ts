import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm' 

export const musicTableSchema = sqliteTable('df_music', {
  id: integer('id').notNull().primaryKey({ autoIncrement: true }).unique(),
  title: text('title').notNull(),
  artist: text('artist'),
  album: text('album'),
  cover: text('cover'),
  blob: blob('blob'),
  filename: text('filename'),
  filetype: text('filetype'),
  source: integer('source').notNull().default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});