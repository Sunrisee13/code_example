import { type RouteProps } from 'react-router-dom'

// eslint-disable-next-line sunrise-y-plugin/layer-imports
import { type UserRole } from '@/entities/User'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
