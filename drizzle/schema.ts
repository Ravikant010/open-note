import { pgTable, index, foreignKey, uuid, varchar, text, timestamp, unique, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const contentType = pgEnum("content_type", ['note', 'post', 'article'])
export const reactionType = pgEnum("reaction_type", ['like', 'dislike', 'bookmark', 'share'])


export const content = pgTable("content", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: contentType().notNull(),
	title: varchar({ length: 255 }).notNull(),
	body: text().notNull(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	index("content_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "content_user_id_users_id_fk"
		}),
]);

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	contentId: uuid("content_id").notNull(),
	userId: uuid("user_id").notNull(),
	body: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("comments_content_id_idx").using("btree", table.contentId.asc().nullsLast().op("uuid_ops")),
	index("comments_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [content.id],
			name: "comments_content_id_content_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("categories_name_unique").on(table.name),
]);

export const reactions = pgTable("reactions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	contentId: uuid("content_id").notNull(),
	userId: uuid("user_id").notNull(),
	reaction: reactionType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("reactions_content_id_idx").using("btree", table.contentId.asc().nullsLast().op("uuid_ops")),
	index("reactions_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [content.id],
			name: "reactions_content_id_content_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reactions_user_id_users_id_fk"
		}),
]);

export const contentCategories = pgTable("content_categories", {
	contentId: uuid("content_id").notNull(),
	categoryId: uuid("category_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("content_categories_category_id_idx").using("btree", table.categoryId.asc().nullsLast().op("uuid_ops")),
	index("content_categories_content_id_idx").using("btree", table.contentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [content.id],
			name: "content_categories_content_id_content_id_fk"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "content_categories_category_id_categories_id_fk"
		}),
	primaryKey({ columns: [table.contentId, table.categoryId], name: "content_categories_content_id_category_id_pk"}),
]);
