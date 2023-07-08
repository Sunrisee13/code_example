import { type StateSchema } from 'app/providers/StoreProvider'
import { getUIScrollByPath, uiActions } from 'feature/UI'
import { memo, type MutableRefObject, useRef, type ReactNode, type UIEvent } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  // useSelector не умеет работать с селекторами с двумя аргументами
  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname))

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: pathname
    }))
  }, 500)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  return (
    <section ref={wrapperRef} onScroll={onScroll} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}/>
    </section>
  )
})
