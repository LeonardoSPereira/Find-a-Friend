import { generateDatabaseUrl } from '@/utils/generate-database-url';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest'

const prisma = new PrismaClient();

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        await prisma.$disconnect()
      }
    }
  }
}