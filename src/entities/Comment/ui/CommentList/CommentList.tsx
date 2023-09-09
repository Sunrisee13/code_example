import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'

import { type Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import cls from './CommentList.module.scss'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    )
  }

  return (
    <div className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map(comment => (
          <CommentCard isLoading={isLoading} comment={comment} className={cls.comment} key={comment.id} />
        ))
        : <Text text={t('Комментарии отсутствуют')} />
      }
    </div>
  )
})
