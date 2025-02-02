// // import { 
// //     pgTable, 
// //     uuid, 
// //     text, 
// //     varchar, 
// //     timestamp, 
// //     pgEnum, 
// //     primaryKey, 
// //     index, 
     
// //   } from 'drizzle-orm/pg-core';
// //   import { relations } from 'drizzle-orm';
// //   // Enums
// //   export const contentTypeEnum = pgEnum('content_type', ['note', 'post', 'article']);
// //   export const reactionTypeEnum = pgEnum('reaction_type', ['like', 'dislike', 'bookmark', 'share']);
  
// //   // Users Table
// //   export const users = pgTable('users', {
// //     id: uuid('id').primaryKey().defaultRandom(),
// //     name: varchar('name', { length: 255 }),
// //     email: varchar('email', { length: 255 }).notNull().unique(),
// //     password: text('password').notNull(),
// //     createdAt: timestamp('created_at').notNull().defaultNow(),
// //     updatedAt: timestamp('updated_at').notNull().defaultNow(),
// //   });
  
  
// //   // Content Table
// //   export const content = pgTable('content', {
// //     id: uuid('id').primaryKey().defaultRandom(),
// //     type: contentTypeEnum('type').notNull(), // Type of content: note, post, or article
// //     title: varchar('title', { length: 255 }).notNull(),
// //     body: text('body').notNull(),
// //     userId: uuid('user_id')
// //         .notNull()
// //         .references(() => users.id), // Foreign key to the users table
// //     likes: text('likes').array().default([]), // Array of user IDs who liked the content
// //     createdAt: timestamp('created_at').notNull().defaultNow(),
// //     updatedAt: timestamp('updated_at').notNull().defaultNow(),
// //     deletedAt: timestamp('deleted_at'), // Soft delete support
// // }, (table) => ({
// //     userIdIndex: index('content_user_id_idx').on(table.userId), // Index for faster lookups
// // }));

// // export const comments = pgTable('comments', {
// //   id: uuid('id').primaryKey().defaultRandom(),
// //   contentId: uuid('content_id')
// //       .notNull()
// //       .references(() => content.id), // Foreign key to the content table
// //   userId: uuid('user_id')
// //       .notNull()
// //       .references(() => users.id), // Foreign key to the users table
// //   body: text('body').notNull(), // The comment text
// //   createdAt: timestamp('created_at').notNull().defaultNow(),
// //   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// // }, (table) => ({
// //   contentIdIndex: index('comments_content_id_idx').on(table.contentId), // Index for faster lookups
// //   userIdIndex: index('comments_user_id_idx').on(table.userId),
// // }));
// //   // Reactions Table
// //   // export const reactions = pgTable('reactions', {
// //   //   id: uuid('id').primaryKey().defaultRandom(),
// //   //   contentId: uuid('content_id')
// //   //     .notNull()
// //   //     .references(() => content.id), // Foreign key to the content table
// //   //   userId: uuid('user_id')
// //   //     .notNull()
// //   //     .references(() => users.id), // Foreign key to the users table
// //   //   reaction: reactionTypeEnum('reaction').notNull(), // Type of reaction: like, dislike, bookmark, or share
// //   //   createdAt: timestamp('created_at').notNull().defaultNow(),
// //   // }, (table) => ({
// //   //   contentIdIndex: index('reactions_content_id_idx').on(table.contentId), // Index for faster lookups
// //   //   userIdIndex: index('reactions_user_id_idx').on(table.userId),
// //   // }));
  
// //   // Categories Table
// //   export const categories = pgTable('categories', {
// //     id: uuid('id').primaryKey().defaultRandom(),
// //     name: varchar('name', { length: 255 }).notNull().unique(), // Unique category name
// //     createdAt: timestamp('created_at').notNull().defaultNow(),
// //     updatedAt: timestamp('updated_at').notNull().defaultNow(),
// //   });
  
// //   // Content-Categories Join Table
// //   export const contentCategories = pgTable('content_categories', 
// //     {
// //       contentId: uuid('content_id')
// //         .notNull()
// //         .references(() => content.id), // Foreign key to the content table
// //       categoryId: uuid('category_id')
// //         .notNull()
// //         .references(() => categories.id), // Foreign key to the categories table
// //       createdAt: timestamp('created_at').notNull().defaultNow(),
// //     },
// //     (table) => ({
// //       primaryKey: primaryKey(table.contentId, table.categoryId), // Composite primary key
// //       contentIdIndex: index('content_categories_content_id_idx').on(table.contentId), // Index for faster lookups
// //       categoryIdIndex: index('content_categories_category_id_idx').on(table.categoryId),
// //     })
// //   );
  
// //   // Comments Table
// //   // export const comments = pgTable('comments', {
// //   //   id: uuid('id').primaryKey().defaultRandom(),
// //   //   contentId: uuid('content_id')
// //   //     .notNull()
// //   //     .references(() => content.id), // Foreign key to the content table
// //   //   userId: uuid('user_id')
// //   //     .notNull()
// //   //     .references(() => users.id), // Foreign key to the users table
// //   //   body: text('body').notNull(), // The comment text
// //   //   createdAt: timestamp('created_at').notNull().defaultNow(),
// //   //   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// //   // }, (table) => ({
// //   //   contentIdIndex: index('comments_content_id_idx').on(table.contentId), // Index for faster lookups
// //   //   userIdIndex: index('comments_user_id_idx').on(table.userId),
// //   // }));
  
// //   // Relationships
// //   export const usersRelations = relations(users, ({ many }) => ({
// //     content: many(content), // A user can create many pieces of content
// //     reactions: many(reactions), // A user can have many reactions
// //     comments: many(comments), // A user can make many comments
// //   }));
  
// //   export const contentRelations = relations(content, ({ one, many }) => ({
// //     author: one(users, {
// //       fields: [content.userId], // Field in `content` table
// //       references: [users.id], // Reference in `users` table
// //     }), // Each piece of content belongs to one user
// //     reactions: many(reactions), // Each piece of content can have many reactions
// //     categories: many(contentCategories), // Each piece of content can belong to many categories
// //     comments: many(comments), // Each piece of content can have many comments
// //   }));
  
// //   export const reactionsRelations = relations(reactions, ({ one }) => ({
// //     content: one(content, {
// //       fields: [reactions.contentId], // Field in `reactions` table
// //       references: [content.id], // Reference in `content` table
// //     }), // Each reaction belongs to one piece of content
// //     user: one(users, {
// //       fields: [reactions.userId], // Field in `reactions` table
// //       references: [users.id], // Reference in `users` table
// //     }), // Each reaction belongs to one user
// //   }));
  
// //   export const categoriesRelations = relations(categories, ({ many }) => ({
// //     content: many(contentCategories), // Each category can be associated with many pieces of content
// //   }));
  
// //   export const contentCategoriesRelations = relations(contentCategories, ({ one }) => ({
// //     content: one(content, {
// //       fields: [contentCategories.contentId], // Field in `contentCategories` table
// //       references: [content.id], // Reference in `content` table
// //     }), // Each entry links to one piece of content
// //     category: one(categories, {
// //       fields: [contentCategories.categoryId], // Field in `contentCategories` table
// //       references: [categories.id], // Reference in `categories` table
// //     }), // Each entry links to one category
// //   }));
  
// //   export const commentsRelations = relations(comments, ({ one }) => ({
// //     content: one(content, {
// //       fields: [comments.contentId], // Field in `comments` table
// //       references: [content.id], // Reference in `content` table
// //     }), // Each comment belongs to one piece of content
// //     user: one(users, {
// //       fields: [comments.userId], // Field in `comments` table
// //       references: [users.id], // Reference in `users` table
// //     }), // Each comment belongs to one user
// //   }));
  
// //   // TypeScript Type Definitions
// //   export type UserInsert = typeof users.$inferInsert; // Type for inserting a user
// //   export type UserSelect = typeof users.$inferSelect; // Type for selecting a user
  
// //   export type ContentInsert = typeof content.$inferInsert; // Type for inserting content
// //   export type ContentSelect = typeof content.$inferSelect; // Type for selecting content
  
// //   export type ReactionInsert = typeof reactions.$inferInsert; // Type for inserting a reaction
// //   export type ReactionSelect = typeof reactions.$inferSelect; // Type for selecting a reaction
  
// //   export type CategoryInsert = typeof categories.$inferInsert; // Type for inserting a category
// //   export type CategorySelect = typeof categories.$inferSelect; // Type for selecting a category
  
// //   export type ContentCategoryInsert = typeof contentCategories.$inferInsert; // Type for inserting a content-category relationship
// //   export type ContentCategorySelect = typeof contentCategories.$inferSelect; // Type for selecting a content-category relationship
  
// //   export type CommentInsert = typeof comments.$inferInsert; // Type for inserting a comment
// //   export type CommentSelect = typeof comments.$inferSelect; // Type for selecting a comment
  
// //   // Enum Types
// //   export type ContentType = typeof contentTypeEnum.enumValues[number]; // Union type of all content types
// //   export type ReactionType = typeof reactionTypeEnum.enumValues[number]; // Union type of all reaction types













// import { 
//   pgTable, 
//   uuid, 
//   text, 
//   varchar, 
//   timestamp, 
//   pgEnum, 
//   primaryKey, 
//   index, 
// } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// // Enums
// export const contentTypeEnum = pgEnum('content_type', ['note', 'post', 'article']);

// // Users Table
// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 255 }),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   password: text('password').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// // Content Table
// export const content = pgTable('content', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   type: contentTypeEnum('type').notNull(), // Type of content: note, post, or article
//   title: varchar('title', { length: 255 }).notNull(),
//   body: text('body').notNull(),
//   userId: uuid('user_id')
//       .notNull()
//       .references(() => users.id), // Foreign key to the users table
//   likes: text('likes').array().default([]), // Array of user IDs who liked the content
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
//   deletedAt: timestamp('deleted_at'), // Soft delete support
// }, (table) => ({
//   userIdIndex: index('content_user_id_idx').on(table.userId), // Index for faster lookups
// }));

// // Comments Table
// export const comments = pgTable('comments', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   contentId: uuid('content_id')
//       .notNull()
//       .references(() => content.id), // Foreign key to the content table
//   userId: uuid('user_id')
//       .notNull()
//       .references(() => users.id), // Foreign key to the users table
//   body: text('body').notNull(), // The comment text
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// }, (table) => ({
//   contentIdIndex: index('comments_content_id_idx').on(table.contentId), // Index for faster lookups
//   userIdIndex: index('comments_user_id_idx').on(table.userId),
// }));

// // Categories Table
// export const categories = pgTable('categories', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 255 }).notNull().unique(), // Unique category name
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// // Content-Categories Join Table
// export const contentCategories = pgTable('content_categories', {
//   contentId: uuid('content_id')
//       .notNull()
//       .references(() => content.id), // Foreign key to the content table
//   categoryId: uuid('category_id')
//       .notNull()
//       .references(() => categories.id), // Foreign key to the categories table
//   createdAt: timestamp('created_at').notNull().defaultNow(),
// }, (table) => ({
//   primaryKey: primaryKey(table.contentId, table.categoryId), // Composite primary key
//   contentIdIndex: index('content_categories_content_id_idx').on(table.contentId), // Index for faster lookups
//   categoryIdIndex: index('content_categories_category_id_idx').on(table.categoryId),
// }));

// // Relationships
// export const usersRelations = relations(users, ({ many }) => ({
//   content: many(content), // A user can create many pieces of content
//   comments: many(comments), // A user can make many comments
// }));

// export const contentRelations = relations(content, ({ one, many }) => ({
//   author: one(users, {
//       fields: [content.userId], // Field in `content` table
//       references: [users.id], // Reference in `users` table
//   }), // Each piece of content belongs to one user
//   categories: many(contentCategories), // Each piece of content can belong to many categories
//   comments: many(comments), // Each piece of content can have many comments
// }));

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   content: many(contentCategories), // Each category can be associated with many pieces of content
// }));

// export const contentCategoriesRelations = relations(contentCategories, ({ one }) => ({
//   content: one(content, {
//       fields: [contentCategories.contentId], // Field in `contentCategories` table
//       references: [content.id], // Reference in `content` table
//   }), // Each entry links to one piece of content
//   category: one(categories, {
//       fields: [contentCategories.categoryId], // Field in `contentCategories` table
//       references: [categories.id], // Reference in `categories` table
//   }), // Each entry links to one category
// }));

// export const commentsRelations = relations(comments, ({ one }) => ({
//   content: one(content, {
//       fields: [comments.contentId], // Field in `comments` table
//       references: [content.id], // Reference in `content` table
//   }), // Each comment belongs to one piece of content
//   user: one(users, {
//       fields: [comments.userId], // Field in `comments` table
//       references: [users.id], // Reference in `users` table
//   }), // Each comment belongs to one user
// }));

// // TypeScript Type Definitions
// export type UserInsert = typeof users.$inferInsert; // Type for inserting a user
// export type UserSelect = typeof users.$inferSelect; // Type for selecting a user

// export type ContentInsert = typeof content.$inferInsert; // Type for inserting content
// export type ContentSelect = typeof content.$inferSelect; // Type for selecting content

// export type CategoryInsert = typeof categories.$inferInsert; // Type for inserting a category
// export type CategorySelect = typeof categories.$inferSelect; // Type for selecting a category

// export type ContentCategoryInsert = typeof contentCategories.$inferInsert; // Type for inserting a content-category relationship
// export type ContentCategorySelect = typeof contentCategories.$inferSelect; // Type for selecting a content-category relationship

// export type CommentInsert = typeof comments.$inferInsert; // Type for inserting a comment
// export type CommentSelect = typeof comments.$inferSelect; // Type for selecting a comment

// // Enum Types
// export type ContentType = typeof contentTypeEnum.enumValues[number]; // Union type of all content types




// import { 
//   pgTable, 
//   uuid, 
//   text, 
//   varchar, 
//   timestamp, 
//   pgEnum, 
//   primaryKey, 
//   index,
//   integer, 
// } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

// // Enums
// export const contentTypeEnum = pgEnum('content_type', ['note', 'post', 'article']);
// export const categoryEnum = pgEnum("category", [
//   "Technology",
//   "Artificial Intelligence",
//   "Business",
//   "Health & Wellness",
//   "Education",
//   "Lifestyle",
//   "Travel",
//   "Food & Cooking",
//   "Sports",
//   "Other",
// ]);
// // Users Table
// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 255 }),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   password: text('password').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// // Categories Table
// export const categories = pgTable('categories', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 255 }).notNull().unique(), // Unique category name
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// // Content-Categories Join Table
// export const contentCategories = pgTable('content_categories', {
//   contentId: uuid('content_id')
//       .notNull()
//       .references(() => content.id), // Foreign key to the content table
//   categoryId: uuid('category_id')
//       .notNull()
//       .references(() => categories.id), // Foreign key to the categories table
//   createdAt: timestamp('created_at').notNull().defaultNow(),
// }, (table) => ({
//   primaryKey: primaryKey({ columns: [table.contentId, table.categoryId] }), // Composite primary key
//   contentIdIndex: index('content_categories_content_id_idx').on(table.contentId), // Index for faster lookups
//   categoryIdIndex: index('content_categories_category_id_idx').on(table.categoryId),
// }));

// // Content Table
// export const content = pgTable(
//   'content', 
//   {
//     id: uuid('id').primaryKey().defaultRandom(),
//     type: contentTypeEnum('type').notNull(), // Type of content: note, post, or article
//     title: varchar('title', { length: 255 }).notNull(),
//     body: text('body').notNull(),
//     userId: uuid('user_id')
//       .notNull()
//       .references(() => users.id), // Foreign key to the users table
//     // category: categoryEnum('category').notNull(), // Category of the content
//     shares: integer('shares').default(0), // Number of shares
//     createdAt: timestamp('created_at').notNull().defaultNow(),
//     updatedAt: timestamp('updated_at').notNull().defaultNow(),
//     deletedAt: timestamp('deleted_at'), // Soft delete support
//   }, 
//   (table) => ({
//     userIdIndex: index('content_user_id_idx').on(table.userId), // Index for faster lookups
//     // categoryIndex: index('content_category_idx').on(table.category), // Index for faster category queries
//   })
// );


// // Likes Table
// export const likes = pgTable('likes', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   contentId: uuid('content_id')
//       .notNull()
//       .references(() => content.id), // Foreign key to the content table
//   userId: uuid('user_id')
//       .notNull()
//       .references(() => users.id), // Foreign key to the users table
//   createdAt: timestamp('created_at').notNull().defaultNow(),
// }, (table) => ({
//   contentIdIndex: index('likes_content_id_idx').on(table.contentId), // Index for faster lookups
//   userIdIndex: index('likes_user_id_idx').on(table.userId),
// }));

// // Comments Table
// export const comments = pgTable('comments', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   contentId: uuid('content_id')
//       .notNull()
//       .references(() => content.id), // Foreign key to the content table
//   userId: uuid('user_id')
//       .notNull()
//       .references(() => users.id), // Foreign key to the users table
//   body: text('body').notNull(), // The comment text
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// }, (table) => ({
//   contentIdIndex: index('comments_content_id_idx').on(table.contentId), // Index for faster lookups
//   userIdIndex: index('comments_user_id_idx').on(table.userId),
// }));

// // Relationships
// export const usersRelations = relations(users, ({ many }) => ({
//   content: many(content), // A user can create many pieces of content
//   likes: many(likes), // A user can like many pieces of content
//   comments: many(comments), // A user can make many comments
// }));



// export const contentRelations = relations(content, ({ one, many }) => ({
//   author: one(users, {
//       fields: [content.userId], // Field in `content` table
//       references: [users.id], // Reference in `users` table
//   }), // Each piece of content belongs to one user
//   likes: many(likes), // Each piece of content can have many likes
//   comments: many(comments), // Each piece of content can have many comments
//   categories: many(contentCategories), // Each piece of content can belong to many categories
// }));

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   content: many(contentCategories), // Each category can be associated with many pieces of content
// }));

// export const contentCategoriesRelations = relations(contentCategories, ({ one }) => ({
//   content: one(content, {
//       fields: [contentCategories.contentId], // Field in `contentCategories` table
//       references: [content.id], // Reference in `content` table
//   }), // Each entry links to one piece of content
//   category: one(categories, {
//       fields: [contentCategories.categoryId], // Field in `contentCategories` table
//       references: [categories.id], // Reference in `categories` table
//   }), // Each entry links to one category
// }));

// export const likesRelations = relations(likes, ({ one }) => ({
//   content: one(content, {
//       fields: [likes.contentId], // Field in `likes` table
//       references: [content.id], // Reference in `content` table
//   }), // Each like belongs to one piece of content
//   user: one(users, {
//       fields: [likes.userId], // Field in `likes` table
//       references: [users.id], // Reference in `users` table
//   }), // Each like belongs to one user
// }));

// export const commentsRelations = relations(comments, ({ one }) => ({
//   content: one(content, {
//       fields: [comments.contentId], // Field in `comments` table
//       references: [content.id], // Reference in `content` table
//   }), // Each comment belongs to one piece of content
//   user: one(users, {
//       fields: [comments.userId], // Field in `comments` table
//       references: [users.id], // Reference in `users` table
//   }), // Each comment belongs to one user
// }));

// // TypeScript Types
// export type UserInsert = typeof users.$inferInsert; // Type for inserting a user
// export type UserSelect = typeof users.$inferSelect; // Type for selecting a user

// export type CategoryInsert = typeof categories.$inferInsert; // Type for inserting a category
// export type CategorySelect = typeof categories.$inferSelect; // Type for selecting a category

// export type ContentInsert = typeof content.$inferInsert; // Type for inserting content
// export type ContentSelect = typeof content.$inferSelect; // Type for selecting content

// export type LikeInsert = typeof likes.$inferInsert; // Type for inserting a like
// export type LikeSelect = typeof likes.$inferSelect; // Type for selecting a like

// export type CommentInsert = typeof comments.$inferInsert; // Type for inserting a comment
// export type CommentSelect = typeof comments.$inferSelect; // Type for selecting a comment

// export type ContentCategoryInsert = typeof contentCategories.$inferInsert; // Type for inserting a content-category relationship
// export type ContentCategorySelect = typeof contentCategories.$inferSelect; // Type for selecting a content-category relationship
// export type Category = typeof categoryEnum.enumValues[number]; // Union type of all categories



import { 
  pgTable, 
  uuid, 
  text, 
  varchar, 
  timestamp, 
  pgEnum, 
  primaryKey, 
  index,
  integer, 
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const contentTypeEnum = pgEnum('content_type', ['note', 'post', 'article']);
export const categoryEnum = pgEnum("category", [
  "Technology",
  "Artificial Intelligence",
  "Business",
  "Health & Wellness",
  "Education",
  "Lifestyle",
  "Travel",
  "Food & Cooking",
  "Sports",
  "Other",
]);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(), // Unique category name
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Content-Categories Join Table
export const contentCategories = pgTable('content_categories', {
  contentId: uuid('content_id')
      .notNull()
      .references(() => content.id, { onDelete: 'cascade' }), // Cascade delete on content deletion
  categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }), // Cascade delete on category deletion
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  primaryKey: primaryKey({ columns: [table.contentId, table.categoryId] }), // Composite primary key
  contentIdIndex: index('content_categories_content_id_idx').on(table.contentId), // Index for faster lookups
  categoryIdIndex: index('content_categories_category_id_idx').on(table.categoryId),
}));

// Content Table
export const content = pgTable(
  'content', 
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: contentTypeEnum('type').notNull(), // Type of content: note, post, or article
    title: varchar('title', { length: 255 }).notNull(),
    body: text('body').notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // Cascade delete on user deletion
    shares: integer('shares').default(0), // Number of shares
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'), // Soft delete support
  }, 
  (table) => ({
    userIdIndex: index('content_user_id_idx').on(table.userId), // Index for faster lookups
  })
);

// Likes Table
export const likes = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentId: uuid('content_id')
      .notNull()
      .references(() => content.id, { onDelete: 'cascade' }), // Cascade delete on content deletion
  userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // Cascade delete on user deletion
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  contentIdIndex: index('likes_content_id_idx').on(table.contentId), // Index for faster lookups
  userIdIndex: index('likes_user_id_idx').on(table.userId),
}));

// Comments Table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  contentId: uuid('content_id')
      .notNull()
      .references(() => content.id, { onDelete: 'cascade' }), // Cascade delete on content deletion
  userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // Cascade delete on user deletion
  body: text('body').notNull(), // The comment text
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  contentIdIndex: index('comments_content_id_idx').on(table.contentId), // Index for faster lookups
  userIdIndex: index('comments_user_id_idx').on(table.userId),
}));

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  content: many(content), // A user can create many pieces of content
  likes: many(likes), // A user can like many pieces of content
  comments: many(comments), // A user can make many comments
}));

export const contentRelations = relations(content, ({ one, many }) => ({
  author: one(users, {
      fields: [content.userId], // Field in `content` table
      references: [users.id], // Reference in `users` table
  }), // Each piece of content belongs to one user
  likes: many(likes), // Each piece of content can have many likes
  comments: many(comments), // Each piece of content can have many comments
  categories: many(contentCategories), // Each piece of content can belong to many categories
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  content: many(contentCategories), // Each category can be associated with many pieces of content
}));

export const contentCategoriesRelations = relations(contentCategories, ({ one }) => ({
  content: one(content, {
      fields: [contentCategories.contentId], // Field in `contentCategories` table
      references: [content.id], // Reference in `content` table
  }), // Each entry links to one piece of content
  category: one(categories, {
      fields: [contentCategories.categoryId], // Field in `contentCategories` table
      references: [categories.id], // Reference in `categories` table
  }), // Each entry links to one category
}));

export const likesRelations = relations(likes, ({ one }) => ({
  content: one(content, {
      fields: [likes.contentId], // Field in `likes` table
      references: [content.id], // Reference in `content` table
  }), // Each like belongs to one piece of content
  user: one(users, {
      fields: [likes.userId], // Field in `likes` table
      references: [users.id], // Reference in `users` table
  }), // Each like belongs to one user
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  content: one(content, {
      fields: [comments.contentId], // Field in `comments` table
      references: [content.id], // Reference in `content` table
  }), // Each comment belongs to one piece of content
  user: one(users, {
      fields: [comments.userId], // Field in `comments` table
      references: [users.id], // Reference in `users` table
  }), // Each comment belongs to one user
}));

// TypeScript Types
export type UserInsert = typeof users.$inferInsert; // Type for inserting a user
export type UserSelect = typeof users.$inferSelect; // Type for selecting a user
export type CategoryInsert = typeof categories.$inferInsert; // Type for inserting a category
export type CategorySelect = typeof categories.$inferSelect; // Type for selecting a category
export type ContentInsert = typeof content.$inferInsert; // Type for inserting content
export type ContentSelect = typeof content.$inferSelect; // Type for selecting content
export type LikeInsert = typeof likes.$inferInsert; // Type for inserting a like
export type LikeSelect = typeof likes.$inferSelect; // Type for selecting a like
export type CommentInsert = typeof comments.$inferInsert; // Type for inserting a comment
export type CommentSelect = typeof comments.$inferSelect; // Type for selecting a comment
export type ContentCategoryInsert = typeof contentCategories.$inferInsert; // Type for inserting a content-category relationship
export type ContentCategorySelect = typeof contentCategories.$inferSelect; // Type for selecting a content-category relationship
export type Category = typeof categoryEnum.enumValues[number]; // Union type of all categories