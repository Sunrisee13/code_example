import { type Article } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecomendations: build.query<Article[], number>({
      query: (limit) => ({
        url: './articles',
        params: {
          _limit: limit,
          _expand: 'user'
        }
      })
    })
  })
})

export const useArticleRecommendations = recommendationsApi.useGetArticleRecomendationsQuery
