import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage, useMediaQuery } from '@/hooks';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { ToastProvider } from '@/components/ui';
type Theme = 'light' | 'dark' | 'system';
const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  theme: 'system',
  setTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);
const strings = {
  en: {
    welcome: 'Welcome back',
    overview: 'Here’s what’s happening in your workspace.',
    language: 'Language',
  },
  sw: {
    welcome: 'Karibu tena',
    overview: 'Haya ndiyo yanayoendelea katika eneo lako la kazi.',
    language: 'Lugha',
  },
};
type Language = keyof typeof strings;
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof strings.en) => string;
}>({ language: 'en', setLanguage: () => {}, t: (key) => strings.en[key] });
export const useLanguage = () => useContext(LanguageContext);
export function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('template-theme', 'system');
  const [language, setLanguage] = useLocalStorage<Language>('template-language', 'en');
  const dark = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'system' ? (dark ? 'dark' : 'light') : theme;
  }, [theme, dark]);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LanguageContext.Provider
        value={{ language, setLanguage, t: (key) => strings[language]?.[key] ?? strings.en[key] }}
      >
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
