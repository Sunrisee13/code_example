import { Theme } from '@/shared/consts/theme'
import { ThemeContext } from '../../context/ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localstorage'
import { useContext } from 'react'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme (): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    let newTheme: Theme
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.ADDITIONAL
        break
      case Theme.ADDITIONAL:
        newTheme = Theme.DARK
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme?.(newTheme)
    // document.body.className = newTheme // Надо почекать, где конфликты могут возникать из-за этого и убрать лишние куски кода
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme
  }
}