import { getPayload } from '@payload/utils/getPayload'
import type * as schema from 'drizzle/schema'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

type DrizzleDB = NodePgDatabase<typeof schema>

export async function getDrizzle() {
  const payload = await getPayload()

  // @ts-expect-error I cast hard
  return payload.db.drizzle as DrizzleDB
}
