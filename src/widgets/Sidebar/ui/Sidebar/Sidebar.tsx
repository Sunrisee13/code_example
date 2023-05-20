import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/RouteConfig/RouteConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import HomeIcon from 'shared/assets/icons/home.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <div className={cls.items}>
        <AppLink to={RoutePath.main} theme={AppLinkTheme.PRIMARY}>
          <HomeIcon className={cls.icon} />
          <span className={cls.link}>
             {t('На главную')}
          </span>
        </AppLink>
        <AppLink to={RoutePath.about} theme={AppLinkTheme.PRIMARY}>
          <AboutIcon className={cls.icon} />
           <span className={cls.link}>
             {t('О нас')}
           </span>
        </AppLink>

      </div>
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapsedBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<' }
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </div>
  )
}
