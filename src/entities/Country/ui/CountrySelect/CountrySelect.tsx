import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Country } from '../../model/types/Country'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'

interface CountrySelectProps {
  className?: string
  value?: Country
  readonly?: boolean
  onChange?: (value: Country) => void
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine }
]

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className,
    value,
    readonly,
    onChange
  } = props
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      options={options}
      value={value}
      readonly={readonly}
      onChange={onChangeHandler}
    />
  )
}
)
