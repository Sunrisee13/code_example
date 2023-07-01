import { lazy } from 'react'

export const ArticlesPageAsync = lazy(
  async () =>
    await new Promise((resolve) =>
      // @ts-expect-error
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./ArticlesPage')) }, 400)
    )
)
