import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting testimonial submission")
    const { name, email, company, role, testimonial, rating } = await request.json()

    console.log("[v0] Received data:", { name, email, company, role, rating, testimonialLength: testimonial?.length })

    if (!name || !email || !testimonial || !rating) {
      console.log("[v0] Missing required fields:", {
        name: !!name,
        email: !!email,
        testimonial: !!testimonial,
        rating: !!rating,
      })
      return NextResponse.json(
        {
          error: "Отсутствуют обязательные поля",
          details: `Не заполнены поля: ${[
            !name && "имя",
            !email && "email",
            !testimonial && "отзыв",
            !rating && "рейтинг",
          ]
            .filter(Boolean)
            .join(", ")}`,
        },
        { status: 400 },
      )
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("[v0] Missing email credentials:", {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
      })
      return NextResponse.json(
        {
          error: "Не настроены учетные данные email",
          details: "Отсутствуют переменные окружения EMAIL_USER или EMAIL_PASS. Обратитесь к администратору сайта.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Creating email transporter")
    let transporter
    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      // Проверяем соединение
      await transporter.verify()
      console.log("[v0] Email transporter verified successfully")
    } catch (transportError) {
      console.error("[v0] Transporter error:", transportError)
      return NextResponse.json(
        {
          error: "Ошибка настройки email",
          details: "Неверные учетные данные email или проблема с подключением к Gmail",
        },
        { status: 500 },
      )
    }

    // HTML шаблон письма
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Новый отзыв на сайте</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">От потенциального заказчика</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="margin-bottom: 25px;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Информация об авторе</h3>
            <p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>Имя:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>Компания:</strong> ${company}</p>` : ""}
            ${role ? `<p style="margin: 8px 0; color: #475569; font-size: 16px;"><strong>Должность:</strong> ${role}</p>` : ""}
          </div>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Рейтинг</h3>
            <div style="font-size: 24px; color: #fbbf24;">
              ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
            </div>
            <p style="color: #64748b; margin: 5px 0 0 0;">${rating} из 5 звезд</p>
          </div>
          
          <div>
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Отзыв</h3>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #64748b;">
              <p style="color: #334155; line-height: 1.6; margin: 0; font-size: 16px; font-style: italic;">"${testimonial}"</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: white; border-radius: 10px;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            Этот отзыв был отправлен через форму на сайте портфолио<br>
            Дата: ${new Date().toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
    `

    console.log("[v0] Sending email...")
    try {
      await transporter.sendMail({
        to: process.env.EMAIL_USER,
        subject: `Новый отзыв от ${name}`,
        html: htmlContent,
      })
      console.log("[v0] Email sent successfully")
    } catch (emailError) {
      console.error("[v0] Email sending error:", emailError)
      const emailErrorMessage = emailError instanceof Error ? emailError.message : "Неизвестная ошибка отправки"
      return NextResponse.json(
        {
          error: "Ошибка отправки email",
          details: `Не удалось отправить письмо: ${emailErrorMessage}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: "Отзыв успешно отправлен" })
  } catch (error) {
    console.error("[v0] Detailed error:", error)
    let errorDetails = "Неизвестная ошибка"

    if (error instanceof Error) {
      errorDetails = error.message

      // Специфичные ошибки
      if (error.message.includes("ENOTFOUND")) {
        errorDetails = "Проблема с подключением к интернету или DNS"
      } else if (error.message.includes("ECONNREFUSED")) {
        errorDetails = "Отказано в подключении к email серверу"
      } else if (error.message.includes("Invalid login")) {
        errorDetails = "Неверные учетные данные email"
      } else if (error.message.includes("timeout")) {
        errorDetails = "Превышено время ожидания подключения"
      }
    }

    return NextResponse.json(
      {
        error: "Ошибка отправки отзыва",
        details: errorDetails,
      },
      { status: 500 },
    )
  }
}
