import React, { memo, useEffect, useRef, type InputHTMLAttributes } from 'react'

import { classNames, type Mods } from '@/shared/lib/classNames/classNames'

import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,
| 'value'
| 'onChange'
| 'readonly'
>

// Типы нам надо переопределить, поэтому мы сначала их удалили, а потом поставили новые значения
interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autofocus?: boolean
  readonly?: boolean
}

export const Input = memo((props: InputProps) => {
  const { className, value, onChange, placeholder, type = 'text', autofocus, readonly, ...otherProps } = props

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  const ref = useRef<HTMLInputElement>(null)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  useEffect(() => {
    if (autofocus) ref.current?.focus()
  }, [autofocus])

  return (
  <div className={classNames(cls.InputWrapper, mods, [className])}>
    {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
    <input readOnly={readonly} ref={ref} className={cls.input} type ={type} value={value} onChange={onChangeHandler} {...otherProps} />
  </div>
  )
})
