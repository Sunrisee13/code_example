import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/deprecated/Button'

import cls from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    location.reload()
  }
  return (
  <div className={classNames(cls.PageError, {}, [className])}>
    {t('Произошла непредвиденная ошибка')}
    <Button onClick={reloadPage} >
      {t('Обновить страницу')}
    </Button>
  </div>
  )
}
