import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const { resendApiKey } = useRuntimeConfig(event)
  const resend = new Resend(resendApiKey)

  try {
    const body = await readBody(event)
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        message: 'Please fill in all required fields.',
      })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <kontakt@hormesch.dev>',
      to: ['nhormesch@posteo.de'],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New contact request from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw createError({
        statusCode: 500,
        message: 'Failed to send email.',
      })
    }

    return { success: true }
  } catch (error: any) {
    console.error('Contact API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An unexpected error occurred.',
    })
  }
})
