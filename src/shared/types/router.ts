// eslint-disable-next-line sunrise-y-plugin/layer-imports
import { type UserRole } from '@/entities/User'
import { type RouteProps } from 'react-router-dom'

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
