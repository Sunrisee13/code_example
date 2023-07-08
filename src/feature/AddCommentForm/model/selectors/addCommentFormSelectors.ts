import { type StateSchema } from 'app/providers/StoreProvider'

// Если в инпут ввести 0, то "или" отработает корректно
// ?? Возвращает значение правого операнда, если значение левого null или undefined
export const getAddCommentFormText = (state: StateSchema) => state?.addCommentForm?.text ?? ''
export const getAddCommentFormError = (state: StateSchema) => state?.addCommentForm?.error
