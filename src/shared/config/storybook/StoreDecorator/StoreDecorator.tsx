import { type DeepPartial } from '@reduxjs/toolkit'
import { type Decorator } from '@storybook/react'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'

const StoreDecorator =
(state: DeepPartial<StateSchema>): Decorator =>
  (Story) => (
      <StoreProvider initialState={state}>
          <Story />
       </StoreProvider>
  )

export default StoreDecorator
