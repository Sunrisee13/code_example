import { AboutPage } from '@/pages/AboutPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticlesDetailsPage } from '@/pages/ArcticleDetailsPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { UserRole } from '@/entities/User'
import { type AppRouteProps } from '@/shared/types/router'
import { AppRoutes, routePath } from '@/shared/consts/router'

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: routePath.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: routePath.about,
    element: <AboutPage />
  },
  [AppRoutes.PROFILE]: {
    path: routePath.profile + ':id',
    element: <ProfilePage />,
    authOnly: true
  },
  [AppRoutes.ARTICLES]: {
    path: routePath.articles,
    element: <ArticlesPage />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: routePath.article_details + ':id',
    element: <ArticlesDetailsPage />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: routePath.article_edit,
    element: <ArticleEditPage />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: routePath.article_details + ':id',
    element: <ArticleEditPage />,
    authOnly: true
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: routePath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  [AppRoutes.FORBIDDEN]: {
    path: routePath.forbidden,
    element: <ForbiddenPage />,
    authOnly: true
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: routePath.not_found,
    element: <NotFoundPage />
  }
}