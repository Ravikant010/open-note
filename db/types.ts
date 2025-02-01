import {
    users,
    content,
    reactions,
    categories,
    contentCategories,
    contentTypeEnum,
    reactionTypeEnum
  } from './schema';
  
  // Basic Type Inference Using $inferInsert and $inferSelect
  export type UserInsert = typeof users.$inferInsert; // Type for inserting a user
  export type UserSelect = typeof users.$inferSelect; // Type for selecting a user
  
  export type ContentInsert = typeof content.$inferInsert; // Type for inserting content
  export type ContentSelect = typeof content.$inferSelect; // Type for selecting content
  
  export type ReactionInsert = typeof reactions.$inferInsert; // Type for inserting a reaction
  export type ReactionSelect = typeof reactions.$inferSelect; // Type for selecting a reaction
  
  export type CategoryInsert = typeof categories.$inferInsert; // Type for inserting a category
  export type CategorySelect = typeof categories.$inferSelect; // Type for selecting a category
  
  export type ContentCategoryInsert = typeof contentCategories.$inferInsert; // Type for inserting a content-category relationship
  export type ContentCategorySelect = typeof contentCategories.$inferSelect; // Type for selecting a content-category relationship
  
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