/* eslint-disable i18next/no-literal-string */
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)

  const onToggleModal = useCallback(() => {
    setIsAuthModal(prev => !prev)
  }, [])

  // Убрать запрет на линтинг, когда будем делать форму

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ButtonTheme.CLEAR} className={cls.links} onClick={onToggleModal} >
        {t('Войти')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal} >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis eos ullam voluptas commodi dolor laboriosam, voluptatibus magni dolorum itaque sequi adipisci ex, eaque voluptatem autem exercitationem nihil! Quidem, impedit soluta?
      </Modal>
    </div>
  )
}
