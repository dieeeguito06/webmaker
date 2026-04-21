import { NextRequest, NextResponse } from "next/server"
import type { BusinessFormData, GeneratedContent } from "@/lib/types"

const BLACKBOX_ENDPOINT = "https://llm.blackbox.ai/chat/completions"
const BLACKBOX_HEADERS = {
  customerId: "cus_UL7pisuzdU8bgL",
  "Content-Type": "application/json",
  Authorization: "Bearer xxx",
}

export async function POST(req: NextRequest) {
  const formData: BusinessFormData = await req.json()

  const systemPrompt = `Eres un experto en marketing digital y copywriting para negocios locales de Madrid, España. 
Tu tarea es generar contenido profesional, atractivo y optimizado para SEO local para una página web de negocio.
Siempre menciona Madrid o barrios madrileños de forma natural en el contenido.
Responde ÚNICAMENTE con un JSON válido, sin texto adicional antes o después del JSON.`

  const userPrompt = `Genera contenido completo para la web del negocio:
- Nombre: ${formData.name}
- Sector: ${formData.sector}
- Dirección: ${formData.address}, ${formData.neighborhood}, Madrid ${formData.postalCode}
- Teléfono: ${formData.phone}
- Email: ${formData.email}
- Servicios principales: ${formData.services.filter(Boolean).join(", ") || "a determinar según sector"}
- Descripción del propietario: ${formData.customDescription || "ninguna, genera tú"}
- Horario: ${formData.openingHours || "Lunes a Viernes 9:00-20:00, Sábados 10:00-14:00"}

Genera el siguiente JSON (sin texto adicional):
{
  "tagline": "slogan memorable en español máximo 8 palabras",
  "taglineEn": "memorable slogan in English max 8 words",
  "heroTitle": "título impactante máximo 5 palabras",
  "heroTitleEn": "impactful title max 5 words",
  "heroSubtitle": "subtítulo 1-2 frases que conecte con el cliente",
  "heroSubtitleEn": "subtitle 1-2 sentences connecting with client",
  "aboutTitle": "título sección sobre nosotros máximo 6 palabras",
  "aboutTitleEn": "about us section title max 6 words",
  "aboutParagraphs": ["párrafo 1 sobre el negocio con mención a Madrid/barrio (3-4 frases)", "párrafo 2 sobre valores y diferenciadores (2-3 frases)", "párrafo 3 invitación a contactar (1-2 frases)"],
  "aboutParagraphsEn": ["paragraph 1 about the business mentioning Madrid (3-4 sentences)", "paragraph 2 about values (2-3 sentences)", "paragraph 3 invitation (1-2 sentences)"],
  "services": [
    {"name": "nombre servicio es", "nameEn": "service name en", "description": "descripción 1-2 frases", "descriptionEn": "description 1-2 sentences", "icon": "emoji icono"},
    {"name": "...", "nameEn": "...", "description": "...", "descriptionEn": "...", "icon": "emoji"},
    {"name": "...", "nameEn": "...", "description": "...", "descriptionEn": "...", "icon": "emoji"},
    {"name": "...", "nameEn": "...", "description": "...", "descriptionEn": "...", "icon": "emoji"},
    {"name": "...", "nameEn": "...", "description": "...", "descriptionEn": "...", "icon": "emoji"},
    {"name": "...", "nameEn": "...", "description": "...", "descriptionEn": "...", "icon": "emoji"}
  ],
  "testimonials": [
    {"name": "nombre español", "location": "barrio Madrid", "text": "testimonio realista 2-3 frases", "textEn": "realistic testimonial 2-3 sentences", "rating": 5, "initials": "XX"},
    {"name": "nombre español", "location": "barrio Madrid", "text": "testimonio realista 2-3 frases", "textEn": "realistic testimonial 2-3 sentences", "rating": 5, "initials": "XX"},
    {"name": "nombre español", "location": "barrio Madrid", "text": "testimonio realista 2-3 frases", "textEn": "realistic testimonial 2-3 sentences", "rating": 5, "initials": "XX"}
  ],
  "ctaText": "texto CTA convincente en español máximo 4 palabras",
  "ctaTextEn": "convincing CTA text in English max 4 words",
  "metaDescription": "descripción SEO máximo 155 caracteres incluyendo Madrid y sector",
  "metaDescriptionEn": "SEO description max 155 chars including Madrid and sector",
  "keywords": "keyword1 Madrid, keyword2 Madrid, keyword3 ${formData.neighborhood} Madrid, ...",
  "whatsappMessage": "Hola! He visto vuestra web y me gustaría obtener más información sobre vuestros servicios."
}`

  try {
    const response = await fetch(BLACKBOX_ENDPOINT, {
      method: "POST",
      headers: BLACKBOX_HEADERS,
      body: JSON.stringify({
        model: "openrouter/claude-sonnet-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    const rawContent = data.choices?.[0]?.message?.content || ""

    // Extract JSON from the response
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON in AI response")
    }

    const generatedContent: GeneratedContent = JSON.parse(jsonMatch[0])

    return NextResponse.json({ success: true, content: generatedContent })
  } catch (error) {
    console.error("[MadridWebMaker] AI generation error:", error)

    // Fallback content if AI fails
    const fallback: GeneratedContent = {
      tagline: `Tu negocio de confianza en Madrid`,
      taglineEn: `Your trusted business in Madrid`,
      heroTitle: `Bienvenidos a ${formData.name}`,
      heroTitleEn: `Welcome to ${formData.name}`,
      heroSubtitle: `Ofrecemos los mejores servicios en ${formData.neighborhood || "Madrid"}. Calidad, profesionalidad y atención personalizada para cada cliente.`,
      heroSubtitleEn: `We offer the best services in ${formData.neighborhood || "Madrid"}. Quality, professionalism and personalised attention for every client.`,
      aboutTitle: `Sobre ${formData.name}`,
      aboutTitleEn: `About ${formData.name}`,
      aboutParagraphs: [
        `En ${formData.name} llevamos años siendo un referente en el sector ${formData.sector} en ${formData.neighborhood || "Madrid"}. Nuestra experiencia y dedicación nos permiten ofrecer un servicio de la más alta calidad a cada uno de nuestros clientes.`,
        `Nos distingue nuestro compromiso con la excelencia y la satisfacción del cliente. Cada proyecto que abordamos lo tratamos con la misma pasión y profesionalidad que nos ha hecho crecer en Madrid.`,
        `Nos encantaría conocerte y ayudarte. Contacta con nosotros hoy mismo y descubre por qué somos la mejor opción en Madrid.`,
      ],
      aboutParagraphsEn: [
        `At ${formData.name} we have been a reference in the ${formData.sector} sector in ${formData.neighborhood || "Madrid"} for years. Our experience and dedication allow us to offer the highest quality service to each of our clients.`,
        `What sets us apart is our commitment to excellence and customer satisfaction. Every project we undertake is treated with the same passion and professionalism that has made us grow in Madrid.`,
        `We would love to meet you and help you. Contact us today and discover why we are the best option in Madrid.`,
      ],
      services: [
        { name: "Consulta Inicial", nameEn: "Initial Consultation", description: "Analizamos tus necesidades para ofrecerte la solución perfecta.", descriptionEn: "We analyse your needs to offer you the perfect solution.", icon: "💬" },
        { name: "Servicio Premium", nameEn: "Premium Service", description: "Atención personalizada con los mejores estándares de calidad.", descriptionEn: "Personalised attention with the highest quality standards.", icon: "⭐" },
        { name: "Atención Rápida", nameEn: "Fast Service", description: "Respondemos en menos de 24 horas y nos adaptamos a tu horario.", descriptionEn: "We respond within 24 hours and adapt to your schedule.", icon: "⚡" },
        { name: "Presupuesto Gratis", nameEn: "Free Quote", description: "Solicita tu presupuesto sin compromiso, completamente gratuito.", descriptionEn: "Request your quote with no obligation, completely free.", icon: "📋" },
        { name: "Garantía Total", nameEn: "Full Guarantee", description: "Todos nuestros servicios incluyen garantía de satisfacción.", descriptionEn: "All our services include a satisfaction guarantee.", icon: "🛡️" },
        { name: "Expertos Locales", nameEn: "Local Experts", description: "Conocemos Madrid como nuestra propia casa. Tu mejor aliado local.", descriptionEn: "We know Madrid like our own home. Your best local ally.", icon: "📍" },
      ],
      testimonials: [
        { name: "María García", location: "Salamanca, Madrid", text: `Llevamos años confiando en ${formData.name} y siempre superan nuestras expectativas. Un servicio impecable y muy profesional. ¡Totalmente recomendable!`, textEn: `We have been trusting ${formData.name} for years and they always exceed our expectations. Impeccable and very professional service. Highly recommended!`, rating: 5, initials: "MG" },
        { name: "Carlos Rodríguez", location: "Chamberí, Madrid", text: `Excelente trato y resultados de primera. En Madrid es difícil encontrar un servicio tan completo y a buen precio. Sin duda repetiré.`, textEn: `Excellent treatment and top results. In Madrid it is hard to find such a comprehensive and well-priced service. I will definitely return.`, rating: 5, initials: "CR" },
        { name: "Ana Martínez", location: "Retiro, Madrid", text: `Me recomendaron ${formData.name} y desde el primer momento sentí que estaba en buenas manos. Profesionales, puntuales y muy amables. 10/10.`, textEn: `I was recommended ${formData.name} and from the very first moment I felt I was in good hands. Professional, punctual and very friendly. 10/10.`, rating: 5, initials: "AM" },
      ],
      ctaText: "Contactar Ahora",
      ctaTextEn: "Contact Now",
      metaDescription: `${formData.name} — ${formData.sector} en ${formData.neighborhood || "Madrid"}. Servicio profesional y de confianza en el corazón de Madrid. ¡Llámanos!`,
      metaDescriptionEn: `${formData.name} — ${formData.sector} in ${formData.neighborhood || "Madrid"}. Professional and trusted service in the heart of Madrid. Call us!`,
      keywords: `${formData.sector} Madrid, ${formData.sector} ${formData.neighborhood} Madrid, ${formData.name} Madrid`,
      whatsappMessage: `Hola! He visto vuestra web y me gustaría obtener más información sobre vuestros servicios.`,
    }

    return NextResponse.json({ success: true, content: fallback, fallback: true })
  }
}
