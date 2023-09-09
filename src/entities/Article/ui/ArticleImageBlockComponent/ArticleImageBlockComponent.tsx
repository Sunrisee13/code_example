import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextAlign } from '@/shared/ui/Text'

import cls from './ArticleImageBlockComponent.module.scss'
import { type ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props

  return (
      <div className={classNames('', {}, [className])}>
        <img className={cls.img} alt={block.title} src={block.src} />
        {block.title && (
          <Text text={block.title} align={TextAlign.CENTER} />
        )}
      </div>
  )
}
)
