import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    connectionString: 'postgresql://root:secret@127.0.0.1:5432/the-pinger',
    url: 'postgresql://root:secret@127.0.0.1:5432/the-pinger',
  },
  dialect: 'postgresql', // "mysql" | "sqlite"
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema.ts',
})
