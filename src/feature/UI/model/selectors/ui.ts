import { createSelector } from '@reduxjs/toolkit'

import { type StateSchema } from 'app/providers/StoreProvider'

export const getUIScroll = (state: StateSchema) => state.ui.scroll

// Можно передать массив нескольких селекторов, можно передавать их несколькими аргументами подряд
// Параметрами в дальнейшие функции будут прилетать результаты выполнения селекторов
// https://youtu.be/DYtdo2DbIlE - Благодаря реселекту можно избегать лишних перерендеров
// В данной реализации
// 1ый селектор вернет скролл
// 2ой селектор принимает +1 аргумент, который надо передавать в getUIScrollByPath
// и последняя функция уже обрабатывает результаты выполнения селекторов

// const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname))
// Пример вызова, тк useSelector работает только с селекторами, у которых один аргумент
export const getUIScrollByPath = createSelector(
  getUIScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0
)
