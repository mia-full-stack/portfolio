import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Валидация данных
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Все поля обязательны для заполнения" }, { status: 400 })
    }

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport({
      service: "gmail", // или другой email сервис
      auth: {
        user: process.env.EMAIL_USER, // ваш email
        pass: process.env.EMAIL_PASS, // пароль приложения
      },
    })

    // Настройки письма
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // ваш email для получения сообщений
      subject: `Новое сообщение с сайта от ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #334155;">Новое сообщение с вашего сайта-портфолио</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Сообщение:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Это сообщение отправлено с вашего сайта-портфолио.
          </p>
        </div>
      `,
    }

    // Отправляем письмо
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Сообщение успешно отправлено!" }, { status: 200 })
  } catch (error) {
    console.error("Ошибка отправки email:", error)
    return NextResponse.json({ error: "Произошла ошибка при отправке сообщения" }, { status: 500 })
  }
}
