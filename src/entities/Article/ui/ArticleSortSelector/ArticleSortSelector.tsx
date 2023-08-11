import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'
import { Select, type SelectOption } from 'shared/ui/Select/Select'
import { type SortOrder } from 'shared/types'

import { ArticleSortField } from '../../model/types/article'
import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, order, sort, onChangeOrder, onChangeSort } = props
  const { t } = useTranslation()

  const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(() => [
    {
      value: 'asc',
      content: t('Возрастанию')
    },
    {
      value: 'desc',
      content: t('Убыванию')
    }
  ], [t])

  const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('Дате создания')
    },
    {
      value: ArticleSortField.TITLE,
      content: t('Названию')
    },
    {
      value: ArticleSortField.VIEVS,
      content: t('Просмотрам')
    }
  ], [t])

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      {/* Ниже вариант, как напрямую если понадобится указать дженерик для компонентов */}
      <Select<ArticleSortField> label={t('Сортировать ПО')} options={sortFieldOptions} value={sort} onChange={onChangeSort} />
      <Select label={t('по')} options={orderOptions} value={order} onChange={onChangeOrder} className={cls.order} />
    </div>
  )
})
