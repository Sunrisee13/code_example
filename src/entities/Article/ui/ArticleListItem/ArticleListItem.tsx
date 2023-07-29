import { type HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text } from 'shared/ui/Text/Text'
import EyeIcon from 'shared/assets/icons/eye.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { routePath } from 'shared/config/RouteConfig/RouteConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from 'shared/consts/localstorage'

import { ArticleBlockType, type ArticleTextBlock, ArticleView, type Article } from '../../model/types/article'
import cls from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
  index: number
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
    target,
    index
  } = props
  const { t } = useTranslation()

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  )

  const handleButtonClick = () => {
    sessionStorage.setItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX, JSON.stringify(index))
  }

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent className={cls.textBlock} block={textBlock} />
          )}
          <div className={cls.footer}>
            <AppLink to={routePath.article_details + article.id} target={target}>
              <Button theme={ButtonTheme.OUTLINE} onClick={handleButtonClick} >
                {t('Читать далее')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink target={target} to={routePath.article_details + article.id} className={classNames('', {}, [className, cls[view]])}>
      <Card >
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.title} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  )
})
