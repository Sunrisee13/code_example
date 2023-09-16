import { type FC, useMemo, useState, type ReactNode, useEffect } from 'react'

import { useJsonSettings } from '@/entities/User'
import { Theme } from '@/shared/consts/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings()

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)
  const [isThemeInited, setThemeInited] = useState(false)

  useEffect(() => {
    if (!isThemeInited) {
      setTheme(defaultTheme)
      setThemeInited(true)
    }
  }, [defaultTheme, isThemeInited])

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
