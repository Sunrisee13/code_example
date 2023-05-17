import { lazy } from 'react'

export const AboutPageAsync = lazy(
  async () =>
    await new Promise((resolve) =>
      // @ts-expect-error
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./AboutPage')) }, 1000)
    )
)

// lazy(() => import("./AboutPage"))
