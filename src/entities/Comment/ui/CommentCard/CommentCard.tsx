import { memo } from 'react'

import { getRouteProfile } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text } from '@/shared/ui/Text'

import cls from './CommentCard.module.scss'
import { type Comment } from '../../model/types/comment'

interface CommentCardProps {
  comment?: Comment
  className?: string
  isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.username}/>
        </div>
        <Skeleton width='100%' height={50} className={cls.text} />
      </div>
    )
  }

  if (!comment) return null

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null }
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
})
