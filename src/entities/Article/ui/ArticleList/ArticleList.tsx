import { type HTMLAttributeAnchorTarget, memo, useState, useRef, useEffect, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Virtuoso, VirtuosoGrid, type VirtuosoGridHandle } from 'react-virtuoso'

import { ArticlesPageFilters } from 'pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters'
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from 'shared/consts/localstorage'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text, TextSize } from 'shared/ui/Text/Text'

import { ArticleView, type Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: Article[]
  view?: ArticleView
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
  onLoadNextPart?: () => void
}

const Header = () => <ArticlesPageFilters />

const getSkeletons = () => {
  return new Array(3).fill(0).map((_, index) => (
    <ArticleListItemSkeleton className={cls.card} view={ArticleView.BIG} key={index} />
  ))
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    target,
    view = ArticleView.SMALL,
    onLoadNextPart
  } = props
  const { t } = useTranslation()
  const [selectedArticleId, setSelectedArticleId] = useState(1)
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null)

  useEffect(() => {
    const paged = sessionStorage.getItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX) || 1
    setSelectedArticleId(+paged)

    // @TODO Удаление, если переходим например в профиль
    // return () => sessionStorage.removeItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (view === ArticleView.SMALL) {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId)
        }
      }, 100)
    }

    return () => { clearTimeout(timeoutId) }
  }, [selectedArticleId, view])

  const renderArticle = (index: number, article: Article) => <ArticleListItem
    article={article}
    view={view}
    className={cls.card}
    key={article.id}
    target={target}
    index={index}
  />

  const Footer = memo(() => isLoading
    ? <div className={cls.skeleton}>
      {getSkeletons()}
    </div>
    : null)

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  const ItemContainerComp: FC<{ height: number, width: number, index: number }> = ({ height, width, index }) => (
    <div className={cls.itemContainer}>
      <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
    </div>
  )

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {view === ArticleView.BIG
        ? (
          <Virtuoso
            style={{ height: '100%' }}
            data={articles}
            itemContent={renderArticle}
            endReached={onLoadNextPart}
            initialTopMostItemIndex={selectedArticleId}
            components={{
              Header,
              Footer
            }}
          />
          )
        : (
          <VirtuosoGrid
            ref={virtuosoGridRef}
            totalCount={articles.length}
            components={{
              Header,
              ScrollSeekPlaceholder: ItemContainerComp
            }}
            endReached={onLoadNextPart}
            data={articles}
            itemContent={renderArticle}
            listClassName={cls.itemsWrapper}
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 200,
              exit: (velocity) => Math.abs(velocity) > 30
            }}
          />
          )}
    </div>
  )
})
