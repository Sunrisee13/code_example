import HomeIcon from 'shared/assets/icons/home.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import ArticleIcon from 'shared/assets/icons/articles.svg'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: routePath.main,
    text: 'Главная',
    Icon: HomeIcon
  },
  {
    path: routePath.about,
    text: 'О сайте',
    Icon: AboutIcon
  },
  {
    path: routePath.profile,
    text: 'Профиль',
    Icon: ProfileIcon,
    authOnly: true
  },
  {
    path: routePath.articles,
    text: 'Статьи',
    Icon: ArticleIcon,
    authOnly: true
  }
]
