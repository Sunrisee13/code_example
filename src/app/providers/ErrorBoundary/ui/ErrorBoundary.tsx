import React, { type ReactNode, type ErrorInfo, Suspense } from 'react'
import { PageError } from '@/widgets/PageError'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // Update state so the next render will show the fallback UI.
  // eslint-disable-next-line n/handle-callback-err
  static getDerivedStateFromError (error: Error) {
    return { hasError: true }
  }

  // You can also log the error to an error reporting service
  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo) // Если используем какой-то инструмент для логирования в проде
  }

  render () {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) { // You can render any custom fallback UI
      // eslint-disable-next-line i18next/no-literal-string
      return (
        <Suspense fallback="">
          <PageError />
        </Suspense>
      )
    }
    return children
  }
}

// export default withTranslation()(ErrorBoundary) интернационализация для классовых компонентов
