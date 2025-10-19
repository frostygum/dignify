import { SQLocalDrizzle } from 'sqlocal/drizzle';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

const DATABASE_OPFS_NAME = 'dignify.db';

const { driver, batchDriver } = new SQLocalDrizzle(DATABASE_OPFS_NAME);

const LocalDBClient = drizzle(driver, batchDriver);

export {
  DATABASE_OPFS_NAME as filename,
  LocalDBClient as client
};