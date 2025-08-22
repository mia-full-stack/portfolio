import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { employerName, employerEmail, message, language } =
      await request.json();

    // Создаем транспортер для отправки email
    const transporter = nodemailer.createTransport({
      service: "gmail", // или другой email сервис
      auth: {
        user: process.env.EMAIL_USER, // ваш email
        pass: process.env.EMAIL_PASS, // пароль приложения
      },
    });

    // Переводы для email
    const emailTranslations = {
      ru: {
        subject: "Резюме от Марина Пакулова",
        greeting: "Здравствуйте",
        intro:
          "Меня зовут Марина Пакулова, я начинающий Full-Stack разработчик.",
        message: "Сообщение от работодателя:",
        skills: "Мои навыки:",
        contact: "Контактная информация:",
        thanks: "Спасибо за рассмотрение моей кандидатуры!",
        regards: "С уважением, Марина Пакулова",
      },
      en: {
        subject: "Resume from Maryna Pakulova",
        greeting: "Hello",
        intro:
          "My name is Maryna Pakulova, I'm a beginner Full-Stack developer.",
        message: "Message from employer:",
        skills: "My skills:",
        contact: "Contact information:",
        thanks: "Thank you for considering my candidacy!",
        regards: "Best regards, Maryna Pakulova",
      },
      uk: {
        subject: "Резюме від Марини Пакулової",
        greeting: "Вітаю",
        intro: "Мене звати Марина Пакулова, я початківець Full-Stack розробник.",
        message: "Повідомлення від роботодавця:",
        skills: "Мої навички:",
        contact: "Контактна інформація:",
        thanks: "Дякую за розгляд моєї кандидатури!",
        regards: "З повагою, Марина Пакулова",
      },
      de: {
        subject: "Lebenslauf von Maryna Pakulova",
        greeting: "Hallo",
        intro:
          "Mein Name ist Maryna Pakulova, ich bin ein Anfänger Full-Stack-Entwickler.",
        message: "Nachricht vom Arbeitgeber:",
        skills: "Meine Fähigkeiten:",
        contact: "Kontaktinformationen:",
        thanks: "Vielen Dank für die Berücksichtigung meiner Kandidatur!",
        regards: "Mit freundlichen Grüßen, Maryna Pakulova",
      },
    };

    const t =
      emailTranslations[language as keyof typeof emailTranslations] ||
      emailTranslations.ru;

    // HTML содержимое письма
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: #334155; margin: 0; font-size: 28px;">${
            t.greeting
          }, ${employerName}!</h1>
          <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">${
            t.intro
          }</p>
        </div>
        
        ${
          message
            ? `
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #334155; margin: 0 0 10px 0;">${t.message}</h3>
            <p style="color: #64748b; margin: 0; line-height: 1.6;">${message}</p>
          </div>
        `
            : ""
        }
        
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
          <h3 style="color: #334155; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${
            t.skills
          }</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <div>
              <h4 style="color: #475569; margin: 0 0 8px 0;">Frontend:</h4>
              <p style="color: #64748b; margin: 0; font-size: 14px;">React, TypeScript, Next.js, Tailwind CSS</p>
            </div>
            <div>
              <h4 style="color: #475569; margin: 0 0 8px 0;">Backend:</h4>
              <p style="color: #64748b; margin: 0; font-size: 14px;">Node.js, Express, REST API</p>
            </div>
            <div>
              <h4 style="color: #475569; margin: 0 0 8px 0;">Database:</h4>
              <p style="color: #64748b; margin: 0; font-size: 14px;">PostgreSQL, MongoDB</p>
            </div>
            <div>
              <h4 style="color: #475569; margin: 0 0 8px 0;">Tools:</h4>
              <p style="color: #64748b; margin: 0; font-size: 14px;">Git, Docker, Vercel</p>
            </div>
          </div>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
          <h3 style="color: #334155; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${
            t.contact
          }</h3>
          <div style="color: #64748b; line-height: 1.8;">
            <p style="margin: 5px 0;"><strong>Email:</strong> mia-full-stack@gmail.com</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> +491754145431</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> Hildesheim, Germany</p>
            <p style="margin: 5px 0;"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mia-pakulova-maryna-060435349/" style="color: #3b82f6;">LinkedIn Profile</a></p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #64748b;">
          <p style="margin: 0 0 10px 0; font-size: 16px;">${t.thanks}</p>
          <p style="margin: 0; font-weight: 600; color: #334155;">${
            t.regards
          }</p>
        </div>
      </div>
    `;

    // Отправляем email работодателю
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: employerEmail,
      subject: t.subject,
      html: htmlContent,
    });

    // Отправляем уведомление себе
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Резюме отправлено: ${employerName}`,
      html: `
        <h2>Резюме было отправлено работодателю</h2>
        <p><strong>Имя работодателя:</strong> ${employerName}</p>
        <p><strong>Email работодателя:</strong> ${employerEmail}</p>
        <p><strong>Язык:</strong> ${language}</p>
        ${message ? `<p><strong>Сообщение:</strong> ${message}</p>` : ""}
        <p><strong>Время отправки:</strong> ${new Date().toLocaleString(
          "ru-RU"
        )}</p>
      `,
    });

    return NextResponse.json({ message: "Resume sent successfully" });
  } catch (error) {
    console.error("Error sending resume:", error);
    return NextResponse.json(
      { error: "Failed to send resume" },
      { status: 500 }
    );
  }
}
