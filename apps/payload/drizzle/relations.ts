import { relations } from 'drizzle-orm/relations'

import {
  payloadPreferences,
  payloadPreferencesRels,
  pings,
  routeGroups,
  routeGroupsRels,
  routeGroupsRoutes,
  users,
} from './schema'

export const payloadPreferencesRelsRelations = relations(payloadPreferencesRels, ({ one }) => ({
  payloadPreference: one(payloadPreferences, {
    fields: [
      payloadPreferencesRels.parentId,
    ],
    references: [
      payloadPreferences.id,
    ],
  }),
  user: one(users, {
    fields: [
      payloadPreferencesRels.usersId,
    ],
    references: [
      users.id,
    ],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  payloadPreferencesRels: many(payloadPreferencesRels),
}))

export const payloadPreferencesRelations = relations(payloadPreferences, ({ many }) => ({
  payloadPreferencesRels: many(payloadPreferencesRels),
}))

export const routeGroupsRelsRelations = relations(routeGroupsRels, ({ one }) => ({
  ping: one(pings, {
    fields: [
      routeGroupsRels.pingsId,
    ],
    references: [
      pings.id,
    ],
  }),
  routeGroup: one(routeGroups, {
    fields: [
      routeGroupsRels.parentId,
    ],
    references: [
      routeGroups.id,
    ],
  }),
}))

export const pingsRelations = relations(pings, ({ many }) => ({
  routeGroupsRels: many(routeGroupsRels),
}))

export const routeGroupsRelations = relations(routeGroups, ({ many }) => ({
  routeGroupsRels: many(routeGroupsRels),
  routeGroupsRoutes: many(routeGroupsRoutes),
}))

export const routeGroupsRoutesRelations = relations(routeGroupsRoutes, ({ one }) => ({
  routeGroup: one(routeGroups, {
    fields: [
      routeGroupsRoutes.parentId,
    ],
    references: [
      routeGroups.id,
    ],
  }),
}))
