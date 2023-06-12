import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileActions, ProfileCard, profileReducer, ValidateProfileError } from 'entities/Profile'
import { type Currency } from 'entities/Currency'
import { type Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = (props: ProfilePageProps) => {
  const {
    className
  } = props
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Произошла непредвиденная ошибка'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Неверно указана страна'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Проверьте введённые пользовательские данные'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны')
  }

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') dispatch(fetchProfileData())
  }, [dispatch])

  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const onChangeFirstNsme = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }))
  }, [dispatch])

  const onChangeLastNsme = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }))
  }, [dispatch])

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    // @ts-expect-error
    if (!isNaN(value)) dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
  }, [dispatch])

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }))
  }, [dispatch])

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }))
  }, [dispatch])

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount >
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map(err => (
          <Text theme={TextTheme.ERROR} text={validateErrorTranslates[err]} key={err} />
        ))}
        <ProfileCard
          readonly={readonly}
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstName={onChangeFirstNsme}
          onChangeLastName={onChangeLastNsme}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeAvatar={onChangeAvatar}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
