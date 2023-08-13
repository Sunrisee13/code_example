import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Page } from 'widgets/Page/Page'
import { ArticleDetails } from 'entities/Article'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ArticleRecommendations } from 'feature/articleRecommendations'

import cls from './ArticleDetailsPage.module.scss'
import { fetchCommentsArticleById } from '../model/services/fetchCommentByArticleId'
import { fetchArticleRecommendations } from '../model/services/fetchRecommendations'
import { articleDetailsPageReducer } from '../model/slices'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComments } from './ArticleDetailsComments/ArticleDetailsComments'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams()

  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchCommentsArticleById(id))
    dispatch(fetchArticleRecommendations())
  })

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <ArticleRecommendations className={cls.recomendations} />
        <ArticleDetailsComments id={id} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
