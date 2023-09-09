import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  theme?: ButtonTheme
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean
  /**
   * Содержимое кнопки
   */
  children?: ReactNode
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean
}

export const Button = memo(({
  className,
  children,
  theme = ButtonTheme.OUTLINE,
  square,
  disabled,
  fullWidth,
  size = ButtonSize.M,
  ...otherProps
}: ButtonProps) => {
  const mods = {
    [cls.disabled]: disabled,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.fullWidth]: fullWidth
  }

  return (
    <button disabled={disabled} className={classNames(cls.Button, mods, [className, cls[theme]])} {...otherProps}>
      {children}
    </button>
  )
}
)
