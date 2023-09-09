import { Suspense } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Loader } from '@/shared/ui/Loader'
import { Modal } from '@/shared/ui/Modal'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
  <Modal className={classNames('', {}, [className])} lazy isOpen={isOpen} onClose={onClose} >
    <Suspense fallback={<Loader />} >
      <LoginFormAsync onSuccess={onClose}/>
    </Suspense>
  </Modal>
  )
}
