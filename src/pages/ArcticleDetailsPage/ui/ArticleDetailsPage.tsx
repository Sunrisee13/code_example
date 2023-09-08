import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { Page } from '@/widgets/Page'
import { ArticleDetails } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ArticleRecommendations } from '@/feature/articleRecommendations'

import cls from './ArticleDetailsPage.module.scss'
import { articleDetailsPageReducer } from '../model/slices'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComments } from './ArticleDetailsComments/ArticleDetailsComments'
import { VStack } from '@/shared/ui/Stack'
import { ArticleRating } from '@/feature/articleRating'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return null
  }

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
              <VStack gap="16" max>
                  <ArticleDetailsPageHeader />
                  <ArticleDetails id={id} />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendations />
                  <ArticleDetailsComments id={id} />
              </VStack>
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
