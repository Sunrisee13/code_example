import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

import cls from './ArticleDetailsPage.module.scss'
import { articlieDetailsCommentsReducer, getArticleComments } from '../model/slices/ArticleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../model/selectors/comments'
import { fetchCommentsArticleById } from '../model/services/fetchCommentByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articlieDetailsCommentsReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation() // На этом моменте я забил на разбиение переводов на чанки, концепция понятна, для обучения мне этим заниматься не надо
  const { id } = useParams()

  const dispatch = useAppDispatch()
  // Тут много всяких модных-молодежных методов, selectAll - достает все комментарии
  const comments = useSelector(getArticleComments.selectAll)
  const commentsisLoading = useSelector(getArticleCommentsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsArticleById(id))
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
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Комментарии')} />
        <CommentList
          isLoading={commentsisLoading}
          comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
