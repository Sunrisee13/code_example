import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from 'shared/config/i18n/i18nForTests'
import { MemoryRouter } from 'react-router-dom'

export interface ComponentRenderOptions {
  route?: string
}
// Какая-то дефолтная история по идее, для рендера компонентов с роутингом. + мы сразу же сюда дописали
// i18n, чтобы не использовать по нескольку раз другие функции
export function componentRender (component: ReactNode, options: ComponentRenderOptions = {}) {
  const {
    route = '/'
  } = options
  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nForTests} >
        {component}
      </I18nextProvider>
    </MemoryRouter>
  )
}
