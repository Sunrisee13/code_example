import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

interface ArticleEditPageProps {
  className?: string
}

export const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  // @TODO Страница создания и редактирования статей
  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit ? t('Редактирование статьи с ID = ') + String(id) : t('Создание новой статьи')}
    </Page>
  )
})

export default ArticleEditPage
