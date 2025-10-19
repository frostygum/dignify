import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm' 

export const schemaHistories = sqliteTable('schema_history', {
  installedOrder: integer('installed_order').primaryKey({ autoIncrement: true }),
  version: text('version').unique(),
  description: text('description'),
  type: text('type'),
  checksum: integer('checksum'),
  script: text('script'),
  installedOn: text('installed_on').default(sql`CURRENT_TIMESTAMP`),
  executionTime: integer('execution_time'),
  success: integer('success', { mode: 'boolean' }).default(false)
});

export const sqliteMasterTableSchema = sqliteTable('sqlite_master', {
  type: text('type'),
  name: text('name'),
  tbl_name: text('tbl_name'),
  rootpage: text('rootpage'),
  sql: text('sql')
})