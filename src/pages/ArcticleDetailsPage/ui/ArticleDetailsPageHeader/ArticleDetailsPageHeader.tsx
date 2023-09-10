/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getArticleDetailsData } from '@/entities/Article'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ButtonTheme, Button } from '@/shared/ui/Button'

import cls from './ArticleDetailsPageHeader.module.scss'
import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const article = useSelector(getArticleDetailsData)
  const canEdit = useSelector(getCanEditArticle)

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id))
    }
  }, [article, navigate])

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        {canEdit && <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
          {t('Редактировать')}
        </Button>}
    </div>
  )
})
