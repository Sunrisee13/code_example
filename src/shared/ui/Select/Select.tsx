import { type ChangeEvent, useMemo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  readonly?: boolean
  onChange?: (value: T) => void
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    readonly,
    value,
    onChange
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }

  const optionList = useMemo(() => {
    return options?.map(opt => (
      <option value={opt.value} className={cls.option} key={opt.value}>{opt.content}</option>
    ))
  },
  [options])
  const mods = {}
  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label &&
        <span>
          {label + '>'}
        </span>
      }
      <select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
        {optionList}
      </select>
    </div>
  )
}
