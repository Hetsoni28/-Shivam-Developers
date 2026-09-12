import { companyConfig } from '@/data/company'

interface WhatsAppParams {
  project?: string
  name: string
  mobile: string
  email?: string
  preferredContact?: string
  message?: string
}

export function generateWhatsAppMessage(params: WhatsAppParams): string {
  const { project, name, mobile, email, preferredContact, message } = params

  let text = `Hello Shivam Developers,\n\n`
  
  if (project) {
    text += `I am interested in ${project}.\n\n`
  } else {
    text += `I am interested in your projects.\n\n`
  }

  text += `Name: ${name}\n`
  text += `Mobile: ${mobile}\n`
  if (email) text += `Email: ${email}\n`
  if (preferredContact) text += `Preferred Contact: ${preferredContact}\n`
  
  if (message) {
    text += `\nMessage:\n${message}\n`
  }

  text += `\nPlease contact me regarding this. Thank you.`

  return text
}

export function getWhatsAppUrl(text: string): string {
  // Remove non-numeric characters from the phone number
  const cleanPhone = companyConfig.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
}
