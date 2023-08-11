import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { type ArticleSortField, ArticleSortSelector, type ArticleView, ArticleViewSelector, type ArticleType } from 'entities/Article'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Input } from 'shared/ui/Input/Input'
import { Card } from 'shared/ui/Card/Card'
import { type SortOrder } from 'shared/types'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'

import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import cls from './ArticlesPageFilters.module.scss'
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from '../../model/selectors/articlesPageSelectors'
import { ArticleTypeTabs } from 'entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs'

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  const debounceFetchData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debounceFetchData()
  }, [dispatch, debounceFetchData])

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  return (
    <div className={classNames('', {}, [className])}>
      <div>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
      </Card>
      <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
    </div>
  )
})
