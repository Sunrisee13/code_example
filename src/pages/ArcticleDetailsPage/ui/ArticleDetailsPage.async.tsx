import { lazy } from 'react'

export const ArticlesDetailsPageAsync = lazy(
  async () =>
    await new Promise((resolve) =>
      // @ts-expect-error
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./ArticleDetailsPage')) }, 400)
    )
)
