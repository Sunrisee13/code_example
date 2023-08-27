import { type RouteProps } from 'react-router-dom'

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

export type AppRouteProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',

  // last
  NOT_FOUND = 'not_found'
}

export const routePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/', // :id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: '/articles/', // :id
  [AppRoutes.ARTICLE_CREATE]: '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ADMIN_PANEL]: '/admin',
  [AppRoutes.FORBIDDEN]: '/forbidden',

  // last
  [AppRoutes.NOT_FOUND]: '*'
}

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
