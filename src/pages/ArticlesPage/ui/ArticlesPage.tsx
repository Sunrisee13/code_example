/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { memo, useCallback, type FC } from 'react'
import { useSelector } from 'react-redux'

import { ArticleList } from 'entities/Article'
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

import cls from './ArticlesPage.module.scss'
import { articlesPageReducer, getArticles } from '../model/slices/articlesPageSlice'
import { getArticlesPageIsLoading, getArticlesPageView } from '../model/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../model/services/fetchArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage'
import { useSearchParams } from 'react-router-dom'

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC = () => {
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
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
        className={cls.list}
        onLoadNextPart={onLoadNextPart}
      />
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
