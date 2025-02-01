import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  users,
  content,
  reactions,
  categories,
  contentCategories,
  contentTypeEnum,
  reactionTypeEnum
} from './schema';

// Basic Type Inference
export type UserInsert = InferInsertModel<typeof users>; // Type for inserting a user
export type UserSelect = InferSelectModel<typeof users>; // Type for selecting a user

export type ContentInsert = InferInsertModel<typeof content>; // Type for inserting content
export type ContentSelect = InferSelectModel<typeof content>; // Type for selecting content

export type ReactionInsert = InferInsertModel<typeof reactions>; // Type for inserting a reaction
export type ReactionSelect = InferSelectModel<typeof reactions>; // Type for selecting a reaction

export type CategoryInsert = InferInsertModel<typeof categories>; // Type for inserting a category
export type CategorySelect = InferSelectModel<typeof categories>; // Type for selecting a category

export type ContentCategoryInsert = InferInsertModel<typeof contentCategories>; // Type for inserting a content-category relationship
export type ContentCategorySelect = InferSelectModel<typeof contentCategories>; // Type for selecting a content-category relationship

// Relation Types
export type UserWithRelations = UserSelect & {
  content?: ContentWithRelations[]; // Related content created by the user
  reactions?: ReactionSelect[]; // Reactions made by the user
};

export type ContentWithRelations = ContentSelect & {
  author?: UserSelect; // The user who created the content
  reactions?: ReactionSelect[]; // Reactions to the content
  categories?: CategorySelect[]; // Categories associated with the content
};

export type ReactionWithRelations = ReactionSelect & {
  content?: ContentSelect; // The content being reacted to
  user?: UserSelect; // The user who made the reaction
};

// Enum Types
export type ContentType = typeof contentTypeEnum.enumValues[number]; // Union type of all content types
export type ReactionType = typeof reactionTypeEnum.enumValues[number]; // Union type of all reaction types