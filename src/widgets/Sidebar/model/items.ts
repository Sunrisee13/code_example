import HomeIcon from 'shared/assets/icons/home.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import { RoutePath } from 'shared/config/RouteConfig/RouteConfig'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    Icon: HomeIcon
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    Icon: ProfileIcon
  }
]
