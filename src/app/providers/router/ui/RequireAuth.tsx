import { type FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from 'entities/User'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'

interface RequireAuthProps {
  children: JSX.Element
}

export const RequireAuth: FC<RequireAuthProps> = (props) => {
  const { children } = props
  const auth = useSelector(getUserAuthData)
  const location = useLocation()

  if (!auth) return <Navigate to={routePath.main} state={{ from: location }} replace />

  return children
}
