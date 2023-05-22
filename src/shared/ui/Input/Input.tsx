import React, { memo, useEffect, useRef, useState, type InputHTMLAttributes } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
// Типы нам надо переопределить, поэтому мы сначала их удалили, а потом поставили новые значения
interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autofocus?: boolean
}

export const Input = memo(({ className, value, onChange, placeholder, type = 'text', autofocus, ...otherProps }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<HTMLInputElement>()
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true)
      ref.current?.focus()
    }
  }, [autofocus])

  return (
  <div className={classNames(cls.InputWrapper, {}, [className])}>
    {placeholder && <div className={cls.placeholder}>{`${placeholder}>`}</div>}
    <input ref={ref} className={cls.input} type ={type} value={value} onChange={onChangeHandler} {...otherProps} />
  </div>
  )
})
