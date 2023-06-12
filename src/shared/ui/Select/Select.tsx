import { type ChangeEvent, memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  readonly?: boolean
  onChange?: (value: string) => void
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    readonly,
    value,
    onChange
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  const optionList = useMemo(() => {
    return options?.map(opt => (
      <option className={cls.option} key={opt.value}>{opt.content}</option>
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
})
