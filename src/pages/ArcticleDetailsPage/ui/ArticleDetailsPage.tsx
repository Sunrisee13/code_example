import { ArticleDetails } from 'entities/Article'
import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation() // На этом моменте я забил на разбиение переводов на чанки, концепция понятна, для обучения мне этим заниматься не надо
  const { id } = useParams()

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  )
}

export default memo(ArticleDetailsPage)
