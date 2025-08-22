"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, GraduationCap, Briefcase, Award, Code } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import { Header } from "@/components/header"

export default function ResumePage() {
  const [language, setLanguage] = useState<Language>("ru")
  const [theme, setTheme] = useState("light")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const savedTheme = localStorage.getItem("theme")

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    localStorage.setItem("theme", theme)

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [language, theme])

  const handleSendResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      employerName: formData.get("employerName"),
      employerEmail: formData.get("employerEmail"),
      message: formData.get("message"),
      language: language,
    }

    try {
      const response = await fetch("/api/send-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const t = translations[language]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Header */}
      <Header
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        translations={t}
      />

      {/* Resume Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header Section */}
          <div
            className={`text-center mb-12 p-8 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-white"} shadow-lg`}
          >
            <img
              src="/marina-avatar.png"
              alt={t.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-300"
            />
            <h1
              className={`font-serif text-3xl font-bold mb-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
            >
              {t.name}
            </h1>
            <p className={`text-xl mb-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t.role}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className={`h-4 w-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>mia-full-stack@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`h-4 w-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>+491754145431</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={`h-4 w-4 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{t.around}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* Professional Summary */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <Briefcase className="h-5 w-5" />
                    {t.resumeSections.summary}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    {t.resumeContent.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <GraduationCap className="h-5 w-5" />
                    {t.resumeSections.education}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className={`font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                      {t.resumeContent.education.course}
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {t.resumeContent.education.school} • {t.resumeContent.education.period}
                    </p>
                    <p className={`text-sm mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {t.resumeContent.education.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <Code className="h-5 w-5" />
                    {t.resumeSections.projects}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {t.resumeContent.projects.map((project, index) => (
                    <div key={index}>
                      <h3 className={`font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                        {project.name}
                      </h3>
                      <p className={`text-sm mb-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className={`text-xs ${
                              theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Technical Skills */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <Award className="h-5 w-5" />
                    {t.resumeSections.skills}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3"].map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={`text-xs ${
                            theme === "dark" ? "border-slate-600 text-slate-400" : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {["Node.js", "Express", "REST API", "JWT"].map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={`text-xs ${
                            theme === "dark" ? "border-slate-600 text-slate-400" : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      {t.databases}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {["PostgreSQL", "MongoDB", "Prisma"].map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={`text-xs ${
                            theme === "dark" ? "border-slate-600 text-slate-400" : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    {t.resumeSections.languages}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {t.resumeContent.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>{lang.name}</span>
                      <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Send Resume Form */}
              <Card className={`${theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center gap-2 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <Send className="h-5 w-5" />
                    {t.resumeSections.sendResume}
                  </CardTitle>
                  <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                    {t.resumeContent.sendDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendResume} className="space-y-4">
                    <div>
                      <Label htmlFor="employerName" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        {t.resumeForm.employerName}
                      </Label>
                      <Input
                        id="employerName"
                        name="employerName"
                        required
                        className={`${theme === "dark" ? "border-slate-600 bg-slate-900 text-slate-200" : "border-slate-300"}`}
                        placeholder={t.resumeForm.employerNamePlaceholder}
                      />
                    </div>
                    <div>
                      <Label htmlFor="employerEmail" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        {t.resumeForm.employerEmail}
                      </Label>
                      <Input
                        id="employerEmail"
                        name="employerEmail"
                        type="email"
                        required
                        className={`${theme === "dark" ? "border-slate-600 bg-slate-900 text-slate-200" : "border-slate-300"}`}
                        placeholder={t.resumeForm.employerEmailPlaceholder}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        {t.resumeForm.message}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        className={`${theme === "dark" ? "border-slate-600 bg-slate-900 text-slate-200" : "border-slate-300"}`}
                        placeholder={t.resumeForm.messagePlaceholder}
                        rows={3}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full text-white ${
                        theme === "dark" ? "bg-slate-700 hover:bg-slate-600" : "bg-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t.resumeForm.sending}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t.resumeForm.sendButton}
                        </>
                      )}
                    </Button>
                    {submitStatus === "success" && (
                      <p className="text-green-600 text-sm text-center">{t.resumeForm.successMessage}</p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-red-600 text-sm text-center">{t.resumeForm.errorMessage}</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
