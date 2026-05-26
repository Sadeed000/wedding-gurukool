import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export interface ContactEmailData {
  name: string
  email: string
  phone: string
  eventDate?: string
  venue?: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, eventDate, venue, message } = data

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Wedding Gurukuls <noreply@konarkweddings.com>',
    to: process.env.CONTACT_EMAIL || 'weddinggurukuljpr@gmail.com',
    subject: `New Enquiry from ${name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf9f0; padding: 40px;">
        <h1 style="color: #c9922a; font-size: 28px; margin-bottom: 8px;">New Wedding Enquiry</h1>
        <p style="color: #7a6a60; margin-bottom: 30px;">A new enquiry has been submitted via konarkweddings.com</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #574840; font-weight: bold; width: 40%;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #2d2520;">${name}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #574840; font-weight: bold;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #2d2520;">${email}</td></tr>
          <tr><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #574840; font-weight: bold;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #2d2520;">${phone}</td></tr>
          ${eventDate ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #574840; font-weight: bold;">Event Date</td><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #2d2520;">${eventDate}</td></tr>` : ''}
          ${venue ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #574840; font-weight: bold;">Preferred Venue</td><td style="padding: 12px 0; border-bottom: 1px solid #f4dfaa; color: #2d2520;">${venue}</td></tr>` : ''}
          <tr><td style="padding: 12px 0; color: #574840; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 12px 0; color: #2d2520;">${message}</td></tr>
        </table>
        <p style="margin-top: 30px; color: #7a6a60; font-size: 13px;">This email was sent from the Wedding Gurukuls website contact form.</p>
      </div>
    `,
  })

  // Auto-reply to client
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Wedding Gurukuls <noreply@konarkweddings.com>',
    to: email,
    subject: 'Thank you for reaching out – Wedding Gurukuls',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf9f0; padding: 40px;">
        <h1 style="color: #c9922a; font-size: 28px;">Thank You, ${name}!</h1>
        <p style="color: #574840; line-height: 1.8;">We have received your enquiry and our team will get back to you within 24 hours.</p>
        <p style="color: #574840; line-height: 1.8;">In the meantime, feel free to explore our portfolio and wedding stories at konarkweddings.com</p>
        <div style="margin-top: 30px; padding: 20px; background: #fff; border-left: 4px solid #c9922a;">
          <p style="color: #7a6a60; font-size: 14px; margin: 0;">Warm regards,<br><strong style="color: #2d2520;">The Wedding Gurukuls Team</strong><br>+91 9782667589 | weddinggurukuljpr@gmail.com</p>
        </div>
      </div>
    `,
  })
}
