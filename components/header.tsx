"use client"

import { ThemeSwitcher } from "./theme-switcher"
import { LanguageSwitcher } from "./language-switcher"

interface HeaderProps {
  theme: string
  onThemeChange: (theme: string) => void
  language: string
  onLanguageChange: (language: string) => void
  translations: any
}

export function Header({ theme, onThemeChange, language, onLanguageChange, translations }: HeaderProps) {
  const t = translations

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 backdrop-blur supports-[backdrop-filter]:bg-opacity-80 shadow-sm ${
        theme === "dark"
          ? "border-slate-700 bg-slate-900/95 supports-[backdrop-filter]:bg-slate-900/80"
          : "border-slate-200 bg-white/95 supports-[backdrop-filter]:bg-white/80"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-center px-4 relative">
        <div
          className={`absolute left-4 font-serif text-xl font-bold transition-colors duration-300 ${
            theme === "dark" ? "text-slate-200 hover:text-slate-400" : "text-slate-800 hover:text-slate-600"
          }`}
        >
          Mia
        </div>

        <nav className="hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <a
              href="/#about"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.about}
            </a>
            <a
              href="/#skills"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.skills}
            </a>
            <a
              href="/#projects"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.projects}
            </a>
            <a
              href="/resume"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.resume}
            </a>
            <a
              href="/testimonials"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.testimonialsTitle}
            </a>
            <a
              href="/admin"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.admin}
            </a>
            <a
              href="/#contact"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark" ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.contact}
            </a>
          </div>
        </nav>

        <div className="absolute right-4 flex items-center gap-2">
          <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
          <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>
    </header>
  )
}
