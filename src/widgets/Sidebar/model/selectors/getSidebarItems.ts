import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from 'entities/User'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'
import HomeIcon from 'shared/assets/icons/home.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticleIcon from 'shared/assets/icons/articles.svg'

import { type SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(
  getUserAuthData, (userData) => {
    const SidebarItemsList: SidebarItemType[] = [
      {
        path: routePath.main,
        text: 'Главная',
        Icon: HomeIcon
      },
      {
        path: routePath.about,
        text: 'О сайте',
        Icon: AboutIcon
      }
    ]
    if (userData) {
      SidebarItemsList.push({
        path: routePath.profile + userData.id,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true
      },
      {
        path: routePath.articles,
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true
      })
    }
    return SidebarItemsList
  }
)