import { relations } from "drizzle-orm/relations";
import { users, content, comments, reactions, contentCategories, categories } from "./schema";

export const contentRelations = relations(content, ({one, many}) => ({
	user: one(users, {
		fields: [content.userId],
		references: [users.id]
	}),
	comments: many(comments),
	reactions: many(reactions),
	contentCategories: many(contentCategories),
}));

export const usersRelations = relations(users, ({many}) => ({
	contents: many(content),
	comments: many(comments),
	reactions: many(reactions),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	content: one(content, {
		fields: [comments.contentId],
		references: [content.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));

export const reactionsRelations = relations(reactions, ({one}) => ({
	content: one(content, {
		fields: [reactions.contentId],
		references: [content.id]
	}),
	user: one(users, {
		fields: [reactions.userId],
		references: [users.id]
	}),
}));

export const contentCategoriesRelations = relations(contentCategories, ({one}) => ({
	content: one(content, {
		fields: [contentCategories.contentId],
		references: [content.id]
	}),
	category: one(categories, {
		fields: [contentCategories.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	contentCategories: many(contentCategories),
}));