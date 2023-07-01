import { memo } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'

import { ArticleView, type Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: Article[]
  view?: ArticleView
  isLoading?: boolean
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((_, index) => (
    <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
  ))
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL
  } = props

  const renderArticle = (article: Article) => <ArticleListItem
    article={article}
    view={view}
    className={cls.card}
    key={article.id}
  />

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
})
