import { memo, type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'

import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation() // На этом моменте я забил на разбиение переводов на чанки, концепция понятна, для обучения мне этим заниматься не надо

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className])}>
      Article Details Page
    </div>
  )
}

export default memo(ArticleDetailsPage)
