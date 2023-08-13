import { rtkApi } from 'shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecomendations: build.query({
      query: (limit) => ({
        url: './articles',
        params: {
          _limit: limit
        }
      })
    })
  })
})

export const useArticleRecommendations = recommendationsApi.useGetArticleRecomendationsQuery
