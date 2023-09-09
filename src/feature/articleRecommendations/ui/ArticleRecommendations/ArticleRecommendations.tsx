import { useTranslation } from 'react-i18next'
import { memo } from 'react'

import { ArticleList } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'
import { VStack } from '@/shared/ui/Stack'

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
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Рекомендуем')} />
            <ArticleList articles={articles} target="_blank" />
        </VStack>
  )
})
