import { memo, Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { getUserAuthData } from 'entities/User'
import { routeConfig } from 'shared/config/RouteConfig/RouteConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData)

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter(route => !(route.authOnly && !isAuth))
  }, [isAuth])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
