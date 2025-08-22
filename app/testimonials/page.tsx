"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { translations, type Language } from "@/lib/translations"
import { ArrowUp, Star, Quote, Send } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function TestimonialsPage() {
  const [language, setLanguage] = useState<Language>("ru")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorDetails, setErrorDetails] = useState<string>("")

  const formRef = useRef<HTMLFormElement>(null)

  const t = translations[language]

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const savedTheme = localStorage.getItem("theme") as "light" | "dark"

    if (savedLanguage) setLanguage(savedLanguage)
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const testimonialData = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      testimonial: formData.get("testimonial"),
      rating: rating,
    }

    console.log("[v0] Submitting testimonial:", testimonialData)

    try {
      const response = await fetch("/api/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      })

      console.log("[v0] Response status:", response.status)

      if (response.ok) {
        setSubmitStatus("success")
        formRef.current?.reset()
        setRating(5)
      } else {
        const errorData = await response.json()
        console.log("[v0] Error response:", errorData)
        setSubmitStatus("error")
        setErrorDetails(errorData.details || errorData.error || "Неизвестная ошибка")
      }
    } catch (error) {
      console.error("[v0] Network error:", error)
      setSubmitStatus("error")
      setErrorDetails("Ошибка сети. Проверьте подключение к интернету.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Header */}
      <Header
        theme={theme}
        onThemeChange={handleThemeChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        translations={t}
      />

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {t.testimonialsTitle}
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {language === "ru" && "Отзывы от коллег, преподавателей и руководителей проектов о моей работе"}
              {language === "uk" && "Відгуки від колег, викладачів та керівників проектів про мою роботу"}
              {language === "en" && "Testimonials from colleagues, instructors and project managers about my work"}
              {language === "de" && "Referenzen von Kollegen, Lehrern und Projektleitern über meine Arbeit"}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700 hover:border-slate-600"
                    : "bg-white border border-slate-200 hover:border-slate-300 shadow-lg"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <div className={`absolute top-4 right-4 ${theme === "dark" ? "text-slate-600" : "text-slate-300"}`}>
                  <Quote size={24} />
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className={`text-sm leading-relaxed mb-6 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden mr-4 ${
                      theme === "dark" ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  >
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      {testimonial.role}
                    </p>
                    <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form for Writing a Review */}
          <div
            className={`mb-16 p-8 rounded-2xl ${
              theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200 shadow-lg"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}
            >
              {language === "ru" && "Оставить отзыв"}
              {language === "uk" && "Залишити відгук"}
              {language === "en" && "Leave a Review"}
              {language === "de" && "Bewertung hinterlassen"}
            </h2>

            <form ref={formRef} onSubmit={handleSubmitTestimonial} className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {language === "ru" && "Имя *"}
                    {language === "uk" && "Ім'я *"}
                    {language === "en" && "Name *"}
                    {language === "de" && "Name *"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-slate-500"
                        : "bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                    } focus:outline-none focus:ring-2 focus:ring-slate-500/20`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {language === "ru" && "Email *"}
                    {language === "uk" && "Email *"}
                    {language === "en" && "Email *"}
                    {language === "de" && "E-Mail *"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-slate-500"
                        : "bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                    } focus:outline-none focus:ring-2 focus:ring-slate-500/20`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {language === "ru" && "Компания"}
                    {language === "uk" && "Компанія"}
                    {language === "en" && "Company"}
                    {language === "de" && "Unternehmen"}
                  </label>
                  <input
                    type="text"
                    name="company"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-slate-500"
                        : "bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                    } focus:outline-none focus:ring-2 focus:ring-slate-500/20`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {language === "ru" && "Должность"}
                    {language === "uk" && "Посада"}
                    {language === "en" && "Position"}
                    {language === "de" && "Position"}
                  </label>
                  <input
                    type="text"
                    name="role"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-slate-500"
                        : "bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                    } focus:outline-none focus:ring-2 focus:ring-slate-500/20`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  {language === "ru" && "Рейтинг *"}
                  {language === "uk" && "Рейтинг *"}
                  {language === "en" && "Rating *"}
                  {language === "de" && "Bewertung *"}
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= rating
                            ? "text-yellow-400 fill-current"
                            : theme === "dark"
                              ? "text-slate-600"
                              : "text-slate-300"
                        } hover:text-yellow-400`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  {language === "ru" && "Отзыв *"}
                  {language === "uk" && "Відгук *"}
                  {language === "en" && "Review *"}
                  {language === "de" && "Bewertung *"}
                </label>
                <textarea
                  name="testimonial"
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 resize-none ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-slate-100 focus:border-slate-500"
                      : "bg-white border-slate-300 text-slate-900 focus:border-slate-500"
                  } focus:outline-none focus:ring-2 focus:ring-slate-500/20`}
                  placeholder={
                    language === "ru"
                      ? "Расскажите о вашем опыте работы со мной..."
                      : language === "uk"
                        ? "Розкажіть про ваш досвід роботи зі мною..."
                        : language === "en"
                          ? "Tell about your experience working with me..."
                          : "Erzählen Sie von Ihrer Erfahrung bei der Arbeit mit mir..."
                  }
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-4 rounded-lg bg-green-100 border border-green-300 text-green-800">
                  {language === "ru" && "Спасибо за ваш отзыв! Он будет рассмотрен и добавлен на сайт."}
                  {language === "uk" && "Дякуємо за ваш відгук! Він буде розглянутий і доданий на сайт."}
                  {language === "en" && "Thank you for your review! It will be reviewed and added to the site."}
                  {language === "de" && "Vielen Dank für Ihre Bewertung! Sie wird geprüft und zur Website hinzugefügt."}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-lg bg-red-100 border border-red-300 text-red-800">
                  <div className="font-medium mb-2">
                    {language === "ru" && "Произошла ошибка при отправке отзыва"}
                    {language === "uk" && "Сталася помилка при відправці відгуку"}
                    {language === "en" && "An error occurred while submitting the review"}
                    {language === "de" && "Beim Senden der Bewertung ist ein Fehler aufgetreten"}
                  </div>
                  {errorDetails && (
                    <div className="text-sm text-red-600">
                      {language === "ru" && "Детали: "}
                      {language === "uk" && "Деталі: "}
                      {language === "en" && "Details: "}
                      {language === "de" && "Details: "}
                      {errorDetails}
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === "dark"
                    ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    {language === "ru" && "Отправить отзыв"}
                    {language === "uk" && "Відправити відгук"}
                    {language === "en" && "Submit Review"}
                    {language === "de" && "Bewertung senden"}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Call to Action */}
          <div
            className={`mt-16 text-center p-8 rounded-2xl ${
              theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200 shadow-lg"
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
              {language === "ru" && "Готовы работать со мной?"}
              {language === "uk" && "Готові працювати зі мною?"}
              {language === "en" && "Ready to work with me?"}
              {language === "de" && "Bereit, mit mir zu arbeiten?"}
            </h3>
            <p className={`mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {language === "ru" && "Свяжитесь со мной для обсуждения возможностей сотрудничества"}
              {language === "uk" && "Зв'яжіться зі мною для обговорення можливостей співпраці"}
              {language === "en" && "Contact me to discuss collaboration opportunities"}
              {language === "de" && "Kontaktieren Sie mich, um Kooperationsmöglichkeiten zu besprechen"}
            </p>
            <Link
              href="/#contact"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-110 ${
                theme === "dark"
                  ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {t.contactMe}
            </Link>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
            theme === "dark"
              ? "bg-slate-700 text-slate-100 hover:bg-slate-600"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  )
}
