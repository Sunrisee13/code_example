/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { memo, useCallback, type FC } from 'react'

import { useSearchParams } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from '@/widgets/Page'

import { ArticleInfiniteList } from './ArticleInfiniteList/ArticleInfiniteList'
import cls from './ArticlesPage.module.scss'
import { ArticlesPageFilters } from './ArticlesPageFilters/ArticlesPageFilters'
import { fetchNextArticlesPage } from '../model/services/fetchArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../model/slices/articlesPageSlice'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page data-testid='ArticlesPage' onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
          <ArticlesPageFilters />
          <ArticleInfiniteList />
        </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
