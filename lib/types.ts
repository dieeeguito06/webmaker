export const SECTORS = [
  { value: "restaurante", label: "Restaurante & Bar", emoji: "🍽️", color: "#C8102E" },
  { value: "peluqueria", label: "Peluquería & Belleza", emoji: "✂️", color: "#E91E8C" },
  { value: "tienda", label: "Tienda & Comercio", emoji: "🛍️", color: "#FF6B35" },
  { value: "abogado", label: "Abogado & Legal", emoji: "⚖️", color: "#1A237E" },
  { value: "gimnasio", label: "Gimnasio & Fitness", emoji: "💪", color: "#2E7D32" },
  { value: "academia", label: "Academia & Formación", emoji: "📚", color: "#6A1B9A" },
  { value: "clinica", label: "Clínica & Salud", emoji: "🏥", color: "#0277BD" },
  { value: "hotel", label: "Hotel & Alojamiento", emoji: "🏨", color: "#D4A017" },
  { value: "fontanero", label: "Fontanero & Hogar", emoji: "🔧", color: "#00695C" },
  { value: "cafeteria", label: "Cafetería & Pastelería", emoji: "☕", color: "#795548" },
  { value: "inmobiliaria", label: "Agencia Inmobiliaria", emoji: "🏠", color: "#37474F" },
  { value: "arquitecto", label: "Arquitecto & Diseño", emoji: "🏛️", color: "#424242" },
  { value: "farmacia", label: "Farmacia", emoji: "💊", color: "#00897B" },
  { value: "otro", label: "Otro Negocio", emoji: "🏢", color: "#546E7A" },
] as const

export const COLOR_PRESETS = [
  { name: "Rojo Madrid", value: "#C8102E" },
  { name: "Azul Atlético", value: "#003DA5" },
  { name: "Verde Retiro", value: "#2E7D32" },
  { name: "Dorado Sol", value: "#D4A017" },
  { name: "Naranja Gran Vía", value: "#E65100" },
  { name: "Morado Real", value: "#6A1B9A" },
  { name: "Azul Cielo", value: "#0277BD" },
  { name: "Carbón Moderno", value: "#1A1A2E" },
] as const

export const MADRID_NEIGHBORHOODS = [
  "Centro", "Salamanca", "Retiro", "Chamberí", "Chamartín", "Tetuán",
  "Moncloa-Aravaca", "Arganzuela", "Latina", "Carabanchel", "Usera",
  "Puente de Vallecas", "Moratalaz", "Ciudad Lineal", "Hortaleza",
  "Villaverde", "Villa de Vallecas", "Vicálvaro", "San Blas-Canillejas",
  "Barajas", "Malasaña", "Lavapiés", "Chueca", "Huertas", "La Latina",
]

export interface BusinessFormData {
  // Step 1: Basic Info
  name: string
  sector: string
  tagline: string
  customDescription: string

  // Step 2: Location & Contact
  address: string
  neighborhood: string
  postalCode: string
  phone: string
  whatsapp: string
  email: string
  website: string

  // Step 3: Services & Hours
  services: string[]
  openingHours: string

  // Step 4: Style
  primaryColor: string
  fontFamily: "poppins" | "roboto" | "playfair"
  instagram: string
  facebook: string
  twitter: string
  language: "es" | "en" | "both"
}

export interface GeneratedService {
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
}

export interface GeneratedTestimonial {
  name: string
  location: string
  text: string
  textEn: string
  rating: number
  initials: string
}

export interface GeneratedContent {
  tagline: string
  taglineEn: string
  heroTitle: string
  heroTitleEn: string
  heroSubtitle: string
  heroSubtitleEn: string
  aboutTitle: string
  aboutTitleEn: string
  aboutParagraphs: string[]
  aboutParagraphsEn: string[]
  services: GeneratedService[]
  testimonials: GeneratedTestimonial[]
  ctaText: string
  ctaTextEn: string
  metaDescription: string
  metaDescriptionEn: string
  keywords: string
  whatsappMessage: string
}

export interface WebsiteConfig {
  formData: BusinessFormData
  generatedContent: GeneratedContent
}
