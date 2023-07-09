import { type ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema'
import { type ArticleDetailsResommendationsSchema } from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema
  recommendations: ArticleDetailsResommendationsSchema
}
