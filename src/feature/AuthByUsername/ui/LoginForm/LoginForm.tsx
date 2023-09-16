import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'

import cls from './LoginForm.module.scss'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'

export interface LoginFormProps {
  onSuccess: () => void
  className?: string
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const error = useSelector(getLoginError)
  const isLoading = useSelector(getLoginIsLoading)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password })).then(result => {
      if (result.meta.requestStatus === 'fulfilled') onSuccess()
    })
  }, [dispatch, username, password, onSuccess])

  return (
    // Мы не создаём внутри reducers ниже объект, чтобы при каждом рендере
    // не генерировалась новая ссылка на объект
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />
        {error && <Text text={ t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
        <Input value={username} onChange={onChangeUsername} type="text" placeholder={t('Логин')} className={cls.input} autofocus />
        <Input value={password} onChange={onChangePassword} type="text" placeholder={t('Пароль')} className={cls.input} />
        <Button disabled={isLoading} onClick={onLoginClick} className={cls.LoginBtn} theme={ButtonTheme.OUTLINE}>
          {t('Войти')}
        </Button>
      </div>

    </DynamicModuleLoader>
  )
}
)

export default LoginForm
