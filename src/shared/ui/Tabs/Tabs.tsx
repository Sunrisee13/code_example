import { memo, useCallback, type ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Tabs.module.scss'
import { Card, CardTheme } from '../Card/Card'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props

  const clickHandle = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab)
    }
  }, [onTabClick])

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card onClick={clickHandle(tab)} key={tab.value} theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}>
          {tab.content}
        </Card>
      ))}
    </div>
  )
})
