import { pgTable, index, uniqueIndex, pgEnum, uuid, timestamp, varchar, numeric, foreignKey, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const locales = pgEnum("_locales", ['nl', 'en'])
export const enumUsersRole = pgEnum("enum_users_role", ['developer', 'editor', 'admin', 'user'])


export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	role: enumUsersRole("role").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: varchar("email").notNull(),
	resetPasswordToken: varchar("reset_password_token"),
	resetPasswordExpiration: timestamp("reset_password_expiration", { precision: 3, withTimezone: true, mode: 'string' }),
	salt: varchar("salt"),
	hash: varchar("hash"),
	loginAttempts: numeric("login_attempts"),
	lockUntil: timestamp("lock_until", { precision: 3, withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		createdAtIdx: index("users_created_at_idx").on(table.createdAt),
		emailIdx: uniqueIndex("users_email_idx").on(table.email),
	}
});

export const media = pgTable("media", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	text: varchar("text"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	url: varchar("url"),
	thumbnailURL: varchar("thumbnail_u_r_l"),
	filename: varchar("filename"),
	mimeType: varchar("mime_type"),
	filesize: numeric("filesize"),
	width: numeric("width"),
	height: numeric("height"),
	focalX: numeric("focal_x"),
	focalY: numeric("focal_y"),
},
(table) => {
	return {
		createdAtIdx: index("media_created_at_idx").on(table.createdAt),
		filenameIdx: uniqueIndex("media_filename_idx").on(table.filename),
	}
});

export const routeGroupsRels = pgTable("route_groups_rels", {
	id: serial("id").primaryKey().notNull(),
	order: integer("order"),
	parentId: uuid("parent_id").notNull().references(() => routeGroups.id, { onDelete: "cascade" } ),
	path: varchar("path").notNull(),
	pingsId: uuid("pings_id").references(() => pings.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		orderIdx: index("route_groups_rels_order_idx").on(table.order),
		parentIdx: index("route_groups_rels_parent_idx").on(table.parentId),
		pathIdx: index("route_groups_rels_path_idx").on(table.path),
	}
});

export const pings = pgTable("pings", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	isSuccess: boolean("is_success"),
	timestamp: timestamp("timestamp", { precision: 3, withTimezone: true, mode: 'string' }),
	url: varchar("url").notNull(),
	responseTimeInMs: numeric("response_time_in_ms"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		createdAtIdx: index("pings_created_at_idx").on(table.createdAt),
	}
});

export const payloadPreferences = pgTable("payload_preferences", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	key: varchar("key"),
	value: jsonb("value"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		keyIdx: index("payload_preferences_key_idx").on(table.key),
		createdAtIdx: index("payload_preferences_created_at_idx").on(table.createdAt),
	}
});

export const payloadPreferencesRels = pgTable("payload_preferences_rels", {
	id: serial("id").primaryKey().notNull(),
	order: integer("order"),
	parentId: uuid("parent_id").notNull().references(() => payloadPreferences.id, { onDelete: "cascade" } ),
	path: varchar("path").notNull(),
	usersId: uuid("users_id").references(() => users.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		orderIdx: index("payload_preferences_rels_order_idx").on(table.order),
		parentIdx: index("payload_preferences_rels_parent_idx").on(table.parentId),
		pathIdx: index("payload_preferences_rels_path_idx").on(table.path),
	}
});

export const payloadMigrations = pgTable("payload_migrations", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name"),
	batch: numeric("batch"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		createdAtIdx: index("payload_migrations_created_at_idx").on(table.createdAt),
	}
});

export const routeGroups = pgTable("route_groups", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name").notNull(),
	repository: varchar("repository").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		createdAtIdx: index("route_groups_created_at_idx").on(table.createdAt),
	}
});

export const routeGroupsRoutes = pgTable("route_groups_routes", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull().references(() => routeGroups.id, { onDelete: "cascade" } ),
	id: varchar("id").primaryKey().notNull(),
	url: varchar("url").notNull(),
	enviroment: varchar("enviroment").notNull(),
},
(table) => {
	return {
		orderIdx: index("route_groups_routes_order_idx").on(table.order),
		parentIdIdx: index("route_groups_routes_parent_id_idx").on(table.parentId),
	}
});