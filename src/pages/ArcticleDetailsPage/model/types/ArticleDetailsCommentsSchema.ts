import { type EntityState } from '@reduxjs/toolkit'

import { type Comment } from '@/entities/Comment'

//  30ая минута, 51ого урока, Тимур показывает, как он копался в этих типах, надо будет пересмотреть.

// export interface EntityState<T> {
//   ids: EntityId[];
//   entities: Dictionary<T>;
// }

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean
  error?: string
}
