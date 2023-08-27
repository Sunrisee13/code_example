import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ListBox } from 'shared/ui/Popups'

import { Currency } from '../../model/types/Currency'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  readonly?: boolean
  onChange?: (value: Currency) => void
}

const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    value,
    readonly,
    onChange
  } = props
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <ListBox
      className={className}
      value={value}
      defaultValue={t('Укажите валюту')}
      label={t('Укажите валюту')}
      items={options}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top right"
    />
  )
}
)
