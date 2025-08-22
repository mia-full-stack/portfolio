"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Star, Award } from "lucide-react"

export default function AdminPage() {
  const [certificateForm, setCertificateForm] = useState({
    title: "",
    description: "",
    date: "",
    image: null as File | null,
  })

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    position: "",
    company: "",
    text: "",
    rating: 5,
    image: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("type", "certificate")
      formData.append("title", certificateForm.title)
      formData.append("description", certificateForm.description)
      formData.append("date", certificateForm.date)
      if (certificateForm.image) {
        formData.append("image", certificateForm.image)
      }

      const response = await fetch("/api/admin/add-content", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setMessage("Сертификат успешно добавлен!")
        setCertificateForm({ title: "", description: "", date: "", image: null })
      } else {
        setMessage("Ошибка при добавлении сертификата")
      }
    } catch (error) {
      setMessage("Ошибка при отправке данных")
    }

    setIsSubmitting(false)
  }

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("type", "testimonial")
      formData.append("name", testimonialForm.name)
      formData.append("position", testimonialForm.position)
      formData.append("company", testimonialForm.company)
      formData.append("text", testimonialForm.text)
      formData.append("rating", testimonialForm.rating.toString())
      if (testimonialForm.image) {
        formData.append("image", testimonialForm.image)
      }

      const response = await fetch("/api/admin/add-content", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setMessage("Отзыв успешно добавлен!")
        setTestimonialForm({ name: "", position: "", company: "", text: "", rating: 5, image: null })
      } else {
        setMessage("Ошибка при добавлении отзыва")
      }
    } catch (error) {
      setMessage("Ошибка при отправке данных")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Панель администратора</h1>
          <p className="text-slate-600 dark:text-slate-300">Управление сертификатами и отзывами на сайте</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Форма добавления сертификата */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Award className="w-5 h-5" />
                Добавить сертификат
              </CardTitle>
              <CardDescription>Загрузите новый сертификат о прохождении курса</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCertificateSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="cert-title">Название сертификата</Label>
                  <Input
                    id="cert-title"
                    value={certificateForm.title}
                    onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                    placeholder="Например: Full-Stack JavaScript Developer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cert-description">Описание</Label>
                  <Textarea
                    id="cert-description"
                    value={certificateForm.description}
                    onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })}
                    placeholder="Краткое описание курса и полученных навыков"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cert-date">Дата получения</Label>
                  <Input
                    id="cert-date"
                    type="date"
                    value={certificateForm.date}
                    onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cert-image">Изображение сертификата</Label>
                  <Input
                    id="cert-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCertificateForm({ ...certificateForm, image: e.target.files?.[0] || null })}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Добавление..." : "Добавить сертификат"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Форма добавления отзыва */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Star className="w-5 h-5" />
                Добавить отзыв
              </CardTitle>
              <CardDescription>Добавьте отзыв от коллеги или преподавателя</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="test-name">Имя</Label>
                  <Input
                    id="test-name"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="Имя и фамилия"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="test-position">Должность</Label>
                  <Input
                    id="test-position"
                    value={testimonialForm.position}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })}
                    placeholder="Senior Developer, Project Manager, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="test-company">Компания/Организация</Label>
                  <Input
                    id="test-company"
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    placeholder="Название компании или учебного заведения"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="test-text">Текст отзыва</Label>
                  <Textarea
                    id="test-text"
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    placeholder="Подробный отзыв о работе или обучении"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="test-rating">Оценка (1-5)</Label>
                  <Input
                    id="test-rating"
                    type="number"
                    min="1"
                    max="5"
                    value={testimonialForm.rating}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, rating: Number.parseInt(e.target.value) })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="test-image">Фото (опционально)</Label>
                  <Input
                    id="test-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.files?.[0] || null })}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Добавление..." : "Добавить отзыв"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  )
}
