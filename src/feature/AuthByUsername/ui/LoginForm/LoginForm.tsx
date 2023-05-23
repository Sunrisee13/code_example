import { loginActions } from '../../model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // Лучше вытаскивать по одному полю
  // Но в маленькой форме можно и забить, перерисовки нам тут не страшны, они дешёвые
  const { username, password, error, isLoading } = useSelector(getLoginState)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
  <div className={classNames(cls.LoginForm, {}, [className])}>
    <Text title={t('Форма авторизации')} />
    {error && <Text text={ t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
    <Input value={username} onChange={onChangeUsername} type="text" placeholder={t('Логин')} className={cls.input} autofocus />
    <Input value={password} onChange={onChangePassword} type="text" placeholder={t('Пароль')} className={cls.input} />
    <Button disabled={isLoading} onClick={onLoginClick} className={cls.LoginBtn} theme={ButtonTheme.OUTLINE}>
      {t('Войти')}
    </Button>
  </div>
  )
}
)
