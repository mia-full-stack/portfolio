"use client"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface ThemeSwitcherProps {
  theme: string
  onThemeChange: (theme: string) => void
}

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
      className="border-slate-300 text-slate-700 hover:bg-slate-100 transition-all duration-300 bg-transparent"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">
        {theme === "light" ? "Переключить на темную тему" : "Переключить на светлую тему"}
      </span>
    </Button>
  )
}

export default ThemeSwitcher
