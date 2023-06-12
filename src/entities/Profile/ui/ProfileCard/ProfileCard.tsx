import { useTranslation } from 'react-i18next'

import { type Currency, CurrencySelect } from 'entities/Currency'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'

import cls from './ProfileCard.module.scss'
import { type Profile } from '../../model/types/Profile'
import { CountrySelect, type Country } from 'entities/Country'

interface ProfileCardProps {
  className?: string
  data?: Profile
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeCity,
    onChangeAge,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry
  } = props
  const { t } = useTranslation('profile')

  const mods = {
    [cls.editing]: !readonly
  }

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, { }, [className, cls.loading])} >
       <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, { }, [className, cls.error])} >
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
      {data?.avatar &&
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </div>
      }
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstName}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastName}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('Ваш возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('Ваш город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
          className={cls.input}
        />
        <CountrySelect
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
          className={cls.input}
        />
      </div>
    </div>
  )
}
