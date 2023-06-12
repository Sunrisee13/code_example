import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entities/Profile'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { type Currency } from 'entities/Currency'
import { type Country } from 'entities/Country'

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readonly = useSelector(getProfileReadonly)

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
