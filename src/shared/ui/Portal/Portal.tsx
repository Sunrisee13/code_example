import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode // То, что мы телепортируем
  element?: HTMLElement // куда мы телепортируем
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
  return createPortal(children, element)
}
