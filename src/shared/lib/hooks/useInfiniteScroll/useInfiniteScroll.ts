import { useEffect, type MutableRefObject } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll (options: UseInfiniteScrollOptions) {
  const {
    callback,
    triggerRef,
    wrapperRef
  } = options

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0
      }

      // Как я пока что понял данную штуку:
      // Мы создали два рефа, на элемент внутри которого смотрим и на тот, который смотрим.
      // опции скопировали с доки
      // callback выполняется, когда в наблюдении появляется triggerRef
      observer = new IntersectionObserver(([entry]) => {
        // Тоже какие-то дефолт параметр. Благодаря этому условию
        // отрабатывать callback будет только когда элемент появляется в зоне видимости
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)

      // Ну и при размонтировании обзервер надо убрать
      return () => {
        if (observer && triggerElement) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(triggerElement)
        }
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
