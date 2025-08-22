"use client";

import { useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  translations: any;
}

export function Header({
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  translations,
}: HeaderProps) {
  const t = translations;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            theme === "dark"
              ? "text-slate-200 hover:text-slate-400"
              : "text-slate-800 hover:text-slate-600"
          }`}
        >
          Mia
        </div>

        <nav className="hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-8">
            <a
              href="/#about"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.about}
            </a>
            <a
              href="/#skills"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.skills}
            </a>
            <a
              href="/#projects"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.projects}
            </a>
            <a
              href="/resume"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.resume}
            </a>
            <a
              href="/testimonials"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.testimonialsTitle}
            </a>
            <a
              href="/admin"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.admin}
            </a>
            <a
              href="/#contact"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.contact}
            </a>
          </div>
        </nav>

        <button
          className="md:hidden absolute left-1/2 transform -translate-x-1/2 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-800"
              } ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-800"
              } ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-800"
              } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
            />
          </div>
        </button>

        <div className="absolute right-4 flex items-center gap-2">
          <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          theme === "dark"
            ? "bg-slate-900/95 border-slate-700"
            : "bg-white/95 border-slate-200"
        } border-t backdrop-blur supports-[backdrop-filter]:bg-opacity-80`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <a
              href="/#about"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.about}
            </a>
            <a
              href="/#skills"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.skills}
            </a>
            <a
              href="/#projects"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.projects}
            </a>
            <a
              href="/resume"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.resume}
            </a>
            <a
              href="/testimonials"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.testimonialsTitle}
            </a>
            <a
              href="/admin"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.admin}
            </a>
            <a
              href="/#contact"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
