import { createSelector } from '@reduxjs/toolkit'
import { type CounterSchema } from '../../types/CounterSchema'
import { getCounter } from '../getCounter/getCounter'

// reselect позволяют создавать сложную структуру селекторов
// createSelect принимает селектор, а вторая ф-я - колбек, который работает
// с результатом выполнения

export const getCounterValue = createSelector(getCounter,
  (counter: CounterSchema) => counter.value
)
