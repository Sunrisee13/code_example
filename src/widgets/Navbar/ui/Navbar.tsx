import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { LoginModal } from 'feature/AuthByUsername'
import { getUserAuthData, userActions } from 'entities/User'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text, TextTheme } from 'shared/ui/Text/Text'

import cls from './Navbar.module.scss'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text className={cls.appName} title={t('My App')} theme={TextTheme.INVERTED} />
        <AppLink className={cls.createBtn} to={routePath.article_create} theme={AppLinkTheme.SECONDARY}>
          {t('Создать статью')}
        </AppLink>
        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={[
            {
              content: t('Профиль'),
              href: routePath.profile + authData.id
            },
            {
              content: t('Выйти'),
              onClick: onLogout
            }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    )
  }

  // Убрать запрет на линтинг, когда будем делать форму

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR} className={cls.links} onClick={onShowModal} >
        {t('Войти')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  )
}
)
