import { memo } from 'react'

import { useParams } from 'react-router-dom'

import { ArticleDetails } from '@/entities/Article'
import { ArticleRating } from '@/feature/articleRating'
import { ArticleRecommendations } from '@/feature/articleRecommendations'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, type ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getFeatureFlag } from '@/shared/lib/features'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page'

import { ArticleDetailsComments } from './ArticleDetailsComments/ArticleDetailsComments'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { articleDetailsPageReducer } from '../model/slices'

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

  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled')
  const isCounterEnabled = getFeatureFlag('isCounterEnabled')

  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
              <VStack gap="16" max>
                  <ArticleDetailsPageHeader />
                  <ArticleDetails id={id} />
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  {isCounterEnabled && <div>Counter</div>}
                  {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                  <ArticleRating articleId={id} />
                  <ArticleRecommendations />
                  <ArticleDetailsComments id={id} />
              </VStack>
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
