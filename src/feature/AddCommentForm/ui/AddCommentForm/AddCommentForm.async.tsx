import { type FC, lazy } from 'react'
import { type AddCommentFormProps } from './AddCommentForm'

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  async () =>
    await new Promise((resolve) =>
      // Имитация задержки для курса
      setTimeout(() => { resolve(import('./AddCommentForm')) }, 1000)
    )
)

// lazy(() => import("./MainPage"))
