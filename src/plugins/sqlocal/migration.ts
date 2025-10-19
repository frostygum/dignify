
import { client } from '@/plugins/sqlocal/client';
import { generateMD5 } from '@/utils/crypto';
import { sql } from 'drizzle-orm' 
import { schemaHistories, sqliteMasterTableSchema } from '@/plugins/sqlocal/schemas/system.schema'

const migrationFiles = import.meta.glob(
  "@/plugins/sqlocal/migrations/**/*.mig.sql",
  {
    eager: true,
    query: '?raw'
  }
);

// V20250909.001__create_configs_tables.mig.sql
const extractFilenameIntoSchemaHistory = (filename: string): RegExpExecArray | null => {
  const regex = /^(V|U|R)(.*)__(.*)\.mig\.sql/g
  return regex.exec(filename);
}

const checkAvailability = () => {
  if (typeof client == undefined || client == null) return false;
  return true;
}

const checkInitialized = async () => {
  return new Promise((resolve) => {
    client
      .select()
      .from(sqliteMasterTableSchema)
      .where(sql`${sqliteMasterTableSchema.name} = 'schema_history'`)
      .then((res) => {
        resolve(res.length > 0);
      })
      .catch((e) => {
        console.error(e)
        resolve(false)
      })
  })
}

export const run = async () => {
  const isClientAvailable = checkAvailability();
  if (!isClientAvailable) {
    console.error('Skip run migration because client is not detected or not found!')
    return;
  }

  const isInitialized = await checkInitialized();
  if (!isInitialized) {
    console.log('Executing initialization for table schema_history')
    await client.run(sql`
      CREATE TABLE IF NOT EXISTS schema_history (
          installed_order         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
          version                 TEXT NOT NULL UNIQUE,
          description             TEXT,
          type                    TEXT,
          checksum                TEXT,
          script                  TEXT,
          installed_on            DATETIME DEFAULT CURRENT_TIMESTAMP,
          execution_time          INTEGER,
          success                 INTEGER
      );
    `)
  }

  const migrations = Object.keys(migrationFiles);

  for (let i = 0; i < migrations.length; i++) {
    const startTime = performance.now();

    const key = migrations[i];
    const module: { default?: string } = migrationFiles[key] as { default?: string };
    const syntax = module.default ?? '';
    const paths = key.split('/')
    const filename = paths[paths.length - 1];
    console.log(filename)
    const extracted = extractFilenameIntoSchemaHistory(filename);

    if (extracted == null || extracted.length <= 1)
      continue

    const version = extracted[2]
    const description = extracted[3]
    const type = extracted[1]
    const checksum = generateMD5(syntax)

    const existing = await client
      .select()
      .from(schemaHistories)
      .where(sql`${schemaHistories.version} = ${version}`)

    const isDiffChecksum = existing.length > 0 && existing[0].checksum != checksum

    if (isDiffChecksum) {
      console.error(`Found different checksum on ${filename}: existing(${existing[0].checksum}), current(${checksum})`)
    }
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    const isValidMigration = existing.length == 0 && !isDiffChecksum;
    if (syntax !== '' && isValidMigration) {
      const isSuccess = await client
        .run(syntax)
        .then(() => Promise.resolve(true))
        .catch((e) => {
          console.error(`Failed to execute ${filename}, with syntax: ${syntax}`, e)
          Promise.resolve(false)
        })

      client
        .insert(schemaHistories)
        .values({
          version: version,
          description: description,
          type: type,
          checksum: checksum,
          script: filename,
          executionTime: executionTime,
          success: isSuccess ? true : false
        })
        .then(() => console.log(`success insert schema history for ${filename}`))
        .catch((e) => console.error(`failed insert schema history for ${filename}`, e))
    }
  }
}