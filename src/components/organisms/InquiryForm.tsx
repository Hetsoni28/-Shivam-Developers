'use client'

import { useState } from 'react'
import { generateWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp'
import { Send } from 'lucide-react'
import { projects } from '@/data/projects'

interface InquiryFormProps {
  defaultProject?: string
}

export function InquiryForm({ defaultProject }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    project: defaultProject || '',
    preferredContact: 'WhatsApp',
    message: '',
  })
  
  const [errors, setErrors] = useState<{name?: string; mobile?: string}>({})

  const validate = () => {
    const newErrors: {name?: string; mobile?: string} = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      const messageText = generateWhatsAppMessage(formData)
      const url = getWhatsAppUrl(messageText)
      window.open(url, '_blank')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-charcoal/20'} px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
            placeholder="John Doe"
            suppressHydrationWarning
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="mobile" className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className={`w-full bg-white border ${errors.mobile ? 'border-red-500' : 'border-charcoal/20'} px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors`}
            placeholder="+91 98765 43210"
            suppressHydrationWarning
          />
          {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="john@example.com"
            suppressHydrationWarning
          />
        </div>
        
        <div>
          <label htmlFor="project" className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
            Interested Project
          </label>
          <select
            id="project"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            className="w-full bg-white border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none rounded-none"
            suppressHydrationWarning
          >
            <option value="">General Inquiry</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.title}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-3">
          Preferred Contact Method
        </label>
        <div className="flex gap-4">
          {['WhatsApp', 'Call', 'Email'].map((method) => (
            <label key={method} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.preferredContact === method ? 'border-primary' : 'border-charcoal/30 group-hover:border-primary'}`}>
                {formData.preferredContact === method && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={formData.preferredContact === method}
                onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                className="hidden"
              />
              <span className="text-sm text-charcoal/80">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white border border-charcoal/20 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder="How can we help you?"
          suppressHydrationWarning
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full justify-center group"
        suppressHydrationWarning
      >
        Send to WhatsApp
        <Send size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-center text-[0.65rem] text-charcoal/50 mt-2">
        You will be redirected to WhatsApp to send this message securely.
      </p>
    </form>
  )
}
