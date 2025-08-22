import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get("type") as string

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    let emailContent = ""
    let subject = ""

    if (type === "certificate") {
      const title = formData.get("title") as string
      const description = formData.get("description") as string
      const date = formData.get("date") as string

      subject = "Новый сертификат добавлен на сайт"
      emailContent = `
        <h2>Новый сертификат</h2>
        <p><strong>Название:</strong> ${title}</p>
        <p><strong>Описание:</strong> ${description}</p>
        <p><strong>Дата получения:</strong> ${date}</p>
        <p>Изображение сертификата прикреплено к письму.</p>
      `
    } else if (type === "testimonial") {
      const name = formData.get("name") as string
      const position = formData.get("position") as string
      const company = formData.get("company") as string
      const text = formData.get("text") as string
      const rating = formData.get("rating") as string

      subject = "Новый отзыв добавлен на сайт"
      emailContent = `
        <h2>Новый отзыв</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Должность:</strong> ${position}</p>
        <p><strong>Компания:</strong> ${company}</p>
        <p><strong>Оценка:</strong> ${rating}/5</p>
        <p><strong>Текст отзыва:</strong></p>
        <blockquote style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 16px 0; font-style: italic;">
          ${text}
        </blockquote>
      `
    }

    // Отправляем email администратору
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // отправляем себе
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${emailContent}
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            Это уведомление отправлено с вашего сайта-портфолио.
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: `${type === "certificate" ? "Сертификат" : "Отзыв"} успешно добавлен`,
    })
  } catch (error) {
    console.error("Ошибка при добавлении контента:", error)
    return NextResponse.json({ success: false, message: "Ошибка при добавлении контента" }, { status: 500 })
  }
}
