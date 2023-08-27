import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ListBox } from 'shared/ui/Popups'

import { Country } from '../../model/types/Country'

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
    value,
    readonly,
    onChange
  } = props
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <ListBox
        onChange={onChangeHandler}
        value={value}
        defaultValue={t('Укажите страну')}
        label={t('Укажите страну')}
        items={options}
        readonly={readonly}
        direction="top right"
    />
  )
}
)
