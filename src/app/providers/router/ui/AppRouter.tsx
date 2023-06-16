import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routeConfig, type AppRouteProps } from 'shared/config/RouteConfig/RouteConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

import { RequireAuth } from './RequireAuth'

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = <div className="page-wrapper">{route.element}</div>
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    )
  }, [])
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
      </Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
