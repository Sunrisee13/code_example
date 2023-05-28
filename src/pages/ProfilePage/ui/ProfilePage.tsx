import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile'
import { useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount >
      <div className={classNames('', {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
