import { memo, useCallback, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { AddCommentForm } from 'feature/AddCommentForm'
import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './ArticleDetailsPage.module.scss'
import { articlieDetailsCommentsReducer, getArticleComments } from '../model/slices/ArticleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../model/selectors/comments'
import { fetchCommentsArticleById } from '../model/services/fetchCommentByArticleId'
import { addCommentForArticle } from '../model/services/addCommentForArticle'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'

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
  const navigate = useNavigate()
  const onBackToList = useCallback(() => {
    navigate(routePath.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

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
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('Комментарии')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          isLoading={commentsisLoading}
          comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
