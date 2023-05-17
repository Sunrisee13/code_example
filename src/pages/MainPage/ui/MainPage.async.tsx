import { lazy } from 'react'

export const MainPageAsync = lazy(
  async () =>
    await new Promise((resolve) =>
      // @ts-expect-error
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./MainPage')) }, 1000)
    )
)

// lazy(() => import("./MainPage"))
