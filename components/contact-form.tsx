"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactFormTranslations {
  title: string
  description: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitButton: string
  submittingButton: string
  successMessage: string
  errorMessage: string
}

interface ContactFormProps {
  translations: ContactFormTranslations
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage(data.message || translations.successMessage)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(data.error || translations.errorMessage)
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage(translations.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-slate-200 bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-slate-800">{translations.title}</CardTitle>
        <CardDescription className="text-slate-600">{translations.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700">
              {translations.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all duration-300"
              placeholder={translations.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700">
              {translations.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all duration-300"
              placeholder={translations.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700">
              {translations.messageLabel}
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all duration-300"
              placeholder={translations.messagePlaceholder}
            />
          </div>

          {/* Статус отправки */}
          {submitStatus === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{statusMessage}</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{statusMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-700 text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? translations.submittingButton : translations.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
