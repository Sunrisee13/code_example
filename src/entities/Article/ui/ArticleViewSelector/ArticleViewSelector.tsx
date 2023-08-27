import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import ListIcon from '@/shared/assets/icons/list.svg'
import TileIcon from '@/shared/assets/icons/tiles.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

import { ArticleView } from '../../model/types/article'
import cls from './ArticleViewSelector.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon
  },
  {
    view: ArticleView.SMALL,
    icon: TileIcon
  }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props

  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ButtonTheme.CLEAR} onClick={() => onViewClick?.(viewType.view)} key={viewType.view}>
          <Icon className={classNames('', { [cls.notSelected]: viewType.view !== view })} Svg={viewType.icon}/>
        </Button>
      ))}
    </div>
  )
})
