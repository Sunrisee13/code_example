import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/deprecated/Stack'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'

import { useArticleRecommendations } from '../../api/articleRecommendationsApi'

interface ArticleRecommendationsProps {
  className?: string
}

export const ArticleRecommendations = memo((props: ArticleRecommendationsProps) => {
  const { className } = props
  const { t } = useTranslation()
  const { isLoading, data: articles, error } = useArticleRecommendations(3)

  if (isLoading || error || !articles) {
    return null
  }

  return (
        <VStack data-testid="ArticleRecommendationsList" gap="8" className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Рекомендуем')} />
            <ArticleList articles={articles} target="_blank" />
        </VStack>
  )
})
