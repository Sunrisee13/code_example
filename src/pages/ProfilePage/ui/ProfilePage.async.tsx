import { lazy } from 'react'

export const ProfilePageAsync = lazy(
  async () =>
    await new Promise((resolve) =>
      // @ts-expect-error
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./ProfilePage')) }, 1000)
    )
)
