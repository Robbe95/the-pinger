import { getDrizzle } from '@payload/utils/getDrizzle'
import { getPayload } from '@payload/utils/getPayload'
import {
  pings,
  routeGroupsRels,
} from 'drizzle/schema'

export async function handlePings() {
  const payload = await getPayload()

  const routeGroupsCollection = await payload.find({
    collection: 'routeGroups',
    depth: 10,
    pagination: false,
  })

  const routeGroups = routeGroupsCollection.docs

  for (const routeGroup of routeGroups) {
    if (routeGroup.routes == null) {
      return
    }
    const newPings = []
    let routeGroupsIndex = 0
    const routeGroupIndexes: number[] = []

    for (const route of routeGroup.routes) {
      const start = Date.now()

      const response = await fetch(route.url)
      const responseTime = (Date.now() - start) / 1000 // <---

      const newPing = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isSuccess: response.ok ?? false,
        responseTimeInMs: responseTime.toString(),
        routeGroupIndex: 0,
        timestamp: new Date().toISOString(),
        url: route.url,
      }

      newPings.push(newPing)
      routeGroupIndexes.push(routeGroupsIndex)
      routeGroupsIndex++
    }

    const drizzle = await getDrizzle()

    const relations: typeof routeGroupsRels.$inferInsert[] = []
    const insertedPings = await drizzle.insert(pings).values(newPings).returning()

    insertedPings.forEach((ping, index) => {
      relations.push({
        parentId: routeGroup.id,
        pingsId: ping.id,
        order: 1,
        path: `routes.${routeGroupIndexes[index] ?? 0}.pings`,
      })
    })

    await drizzle.insert(routeGroupsRels).values(relations)
    routeGroupsIndex++
  }
}
