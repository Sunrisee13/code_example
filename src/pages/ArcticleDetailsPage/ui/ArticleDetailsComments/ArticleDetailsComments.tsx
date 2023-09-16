import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/feature/AddCommentForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'

import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle'
import { fetchCommentsArticleById } from '../../model/services/fetchCommentByArticleId'
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
  const { className, id } = props
  const { t } = useTranslation()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useDispatch()

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsArticleById(id))
  })

  return (
        <VStack gap="16" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Комментарии')}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
  )
})
