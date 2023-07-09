/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { memo, useCallback, type FC } from 'react'
import { useSelector } from 'react-redux'

import { ArticleList } from 'entities/Article'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'widgets/Page/Page'

import cls from './ArticlesPage.module.scss'
import { articlesPageReducer, getArticles } from '../model/slices/articlesPageSlice'
import { getArticlesPageIsLoading, getArticlesPageView } from '../model/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../model/services/fetchArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage'
import { ArticlesPageFilters } from './ArticlesPageFilters/ArticlesPageFilters'
import { useSearchParams } from 'react-router-dom'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  // const error = useSelector(getArticlesPageError) Если error, можно выводить какую-то плашку
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
          <ArticlesPageFilters />
          <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={cls.list}
          />
        </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
