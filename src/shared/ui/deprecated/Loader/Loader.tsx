import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => {
  return (
    <span className={classNames(cls.loader, {}, [className])}></span>
  )
}
)
