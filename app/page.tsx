"use client"

import { useState, useEffect } from "react"
import { BusinessForm } from "@/components/madrid-web-maker/business-form"
import { GeneratingScreen } from "@/components/madrid-web-maker/generating-screen"
import { WebsitePreview } from "@/components/madrid-web-maker/website-preview"
import { ExportPanel } from "@/components/madrid-web-maker/export-panel"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  ArrowRight, Sparkles, Globe, Target, Shield, Zap,
  CheckCircle2, Star, Menu, X, MapPin, Phone, ChevronDown, Monitor,
} from "lucide-react"
import type { BusinessFormData, WebsiteConfig } from "@/lib/types"
import { generateWebsiteHTML } from "@/lib/website-generator"

type AppStep = "landing" | "form" | "generating" | "preview"

const STATS = [
  { value: "10.000+", label: "Webs creadas" },
  { value: "5 min", label: "Tiempo medio" },
  { value: "98%", label: "Satisfacción" },
  { value: "100%", label: "Gratis" },
]

const FEATURES = [
  { icon: Sparkles, title: "IA que escribe por ti", desc: "Contenido profesional generado automáticamente, optimizado para tu sector y barrio en Madrid." },
  { icon: Target, title: "SEO Local Madrid", desc: "Schema.org, meta tags y palabras clave locales. Aparece en Google cuando busquen tu negocio." },
  { icon: Globe, title: "Bilingüe ES / EN", desc: "Tu web en español e inglés automáticamente. Llega a clientes internacionales en Madrid." },
  { icon: Zap, title: "WhatsApp + Maps", desc: "Botón flotante de WhatsApp Business y Google Maps embed para que te encuentren fácilmente." },
  { icon: Shield, title: "RGPD compliant", desc: "Política de privacidad, aviso legal y banner de cookies incluidos. Cumple la normativa europea." },
  { icon: Monitor, title: "100% Responsive", desc: "Diseño mobile-first. Se ve perfecto en móvil, tablet y escritorio sin esfuerzo." },
]

const SECTORS_PREVIEW = [
  { icon: "🍽️", name: "Restaurantes" },
  { icon: "✂️", name: "Peluquerías" },
  { icon: "⚖️", name: "Abogados" },
  { icon: "💪", name: "Gimnasios" },
  { icon: "🏥", name: "Clínicas" },
  { icon: "🏠", name: "Inmobiliarias" },
  { icon: "☕", name: "Cafeterías" },
  { icon: "📚", name: "Academias" },
]

const TESTIMONIALS = [
  { name: "Carmen Vidal", role: "Restaurante El Rincón, Malasaña", text: "En 10 minutos tenía mi web lista. Mis clientes me encuentran en Google y el botón de WhatsApp me trae reservas cada día.", rating: 5, initials: "CV" },
  { name: "David Moreno", role: "Clínica Dental Moreno, Chamberí", text: "Nunca imaginé que podría tener una web tan profesional sin pagar a un diseñador. El SEO local funciona de verdad.", rating: 5, initials: "DM" },
  { name: "Laura Sanz", role: "Peluquería Sanz, Salamanca", text: "Mis clientas dicen que la web parece de una gran empresa. La descargué y la subí a internet en media hora. Increíble.", rating: 5, initials: "LS" },
]

export default function MadridWebMakerPage() {
  const [step, setStep] = useState<AppStep>("landing")
  const [formData, setFormData] = useState<BusinessFormData | null>(null)
  const [htmlContent, setHtmlContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showExportSheet, setShowExportSheet] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleFormSubmit = async (data: BusinessFormData) => {
    setFormData(data)
    setIsGenerating(true)
    setStep("generating")
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("AI generation failed")
      const result = await response.json()
      const config: WebsiteConfig = { formData: data, generatedContent: result.content }
      const html = generateWebsiteHTML(config)
      await new Promise((r) => setTimeout(r, 5000))
      setHtmlContent(html)
      setStep("preview")
    } catch (err) {
      console.error("[MadridWebMaker] Generation error:", err)
      setStep("form")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = async () => {
    if (!formData) return
    setShowExportSheet(false)
    await handleFormSubmit(formData)
  }

  const handleStartOver = () => {
    setStep("landing")
    setFormData(null)
    setHtmlContent("")
    setShowExportSheet(false)
  }

  /* ─── HEADER ─────────────────────────────────────────────────────── */
  const isHeroTransparent = step === "landing" && !scrolled

  const SiteHeader = () => (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isHeroTransparent ? "transparent" : "rgba(255,255,255,0.97)",
        boxShadow: isHeroTransparent ? "none" : "0 2px 20px rgba(30,58,138,0.08)",
        backdropFilter: isHeroTransparent ? "none" : "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleStartOver} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#1E3A8A" }}>
            <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
              <rect x="4" y="20" width="5" height="8" rx="1" fill="#D4AF37" />
              <rect x="11" y="14" width="5" height="14" rx="1" fill="white" />
              <rect x="18" y="8" width="5" height="20" rx="1" fill="#D4AF37" />
              <rect x="25" y="17" width="3" height="11" rx="1" fill="white" opacity="0.7" />
              <path d="M4 20 L13.5 14 L20.5 8 L28 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className="font-extrabold text-base tracking-tight"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              color: isHeroTransparent ? "white" : "#1E3A8A",
            }}
          >
            Madrid<span style={{ color: "#D4AF37" }}>WebMaker</span>
          </span>
        </button>

        {/* Desktop nav — only on landing */}
        {step === "landing" && (
          <nav className="hidden md:flex items-center gap-1">
            {[["#como-funciona", "Ver Demo"], ["#sectores", "Sectores"], ["#testimonios", "Opiniones"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: isHeroTransparent ? "rgba(255,255,255,0.85)" : "#64748B" }}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => setStep("form")}
              className="ml-2 px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 4px 16px rgba(212,175,55,0.35)" }}
            >
              Crear Gratis
            </button>
          </nav>
        )}

        {/* Controls — non-landing steps */}
        {step !== "landing" && (
          <div className="flex items-center gap-2">
            {step === "preview" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportSheet(true)}
                className="h-8 text-xs border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                Descargar web
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleStartOver} className="text-slate-400 hover:text-slate-800 h-8 text-xs gap-1">
              <X className="w-3.5 h-3.5" /> Salir
            </Button>
          </div>
        )}

        {/* Mobile menu toggle */}
        {step === "landing" && (
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: isHeroTransparent ? "white" : "#374151" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && step === "landing" && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg px-4 py-4 space-y-1">
          <a href="#como-funciona" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Ver Demo</a>
          <a href="#sectores" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Sectores</a>
          <a href="#testimonios" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Opiniones</a>
          <button
            onClick={() => { setStep("form"); setMobileMenuOpen(false) }}
            className="w-full mt-2 py-3 rounded-xl text-sm font-bold"
            style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Crear mi web GRATIS
          </button>
        </div>
      )}
    </header>
  )

  /* ─── LANDING ───────────────────────────────────────────────────── */
  if (step === "landing") {
    return (
      <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
        <SiteHeader />

        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #0F2055 100%)" }}>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://placehold.co/1920x1080?text=Madrid+skyline+Almudena+cathedral+night+golden+light+aerial+view"
              alt="Madrid skyline nocturno"
              className="w-full h-full object-cover"
              style={{ opacity: 0.18 }}
            />
            <div className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none" style={{ background: "rgba(212,175,55,0.07)", filter: "blur(60px)" }} />
            <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(59,94,198,0.12)", filter: "blur(80px)" }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.18)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#D4AF37" }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.88)" }}>10.000+ webs creadas en Madrid</span>
              </div>

              {/* H1 */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", lineHeight: 1.1 }}
              >
                Tu web profesional para negocio Madrid{" "}
                <span style={{ background: "linear-gradient(135deg, #D4AF37, #E8C84A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  en 5 minutos
                </span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "600px" }}>
                SEO local + WhatsApp Business + Google Maps incluido. Sin código. Sin complicaciones. Descarga tu web y publícala hoy.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button
                  onClick={() => setStep("form")}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 group"
                  style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 8px 32px rgba(212,175,55,0.4)" }}
                >
                  Crear mi web GRATIS
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#como-funciona"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-medium transition-all hover:bg-white/10 border-2"
                  style={{ borderColor: "rgba(255,255,255,0.28)", color: "white" }}
                >
                  Ver ejemplos reales
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#D4AF37" }}>{s.value}</div>
                    <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span className="text-xs tracking-widest uppercase font-medium">Descubrir</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="como-funciona" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "#EFF4FF", color: "#1E3A8A" }}>
                Proceso
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>
                De cero a web publicada en 3 pasos
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
                Tan sencillo que cualquier dueño de negocio puede hacerlo sin ayuda técnica.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-16 mb-14">
              {[
                { step: "01", title: "Rellena el formulario", desc: "Dinos el nombre, sector y datos de contacto de tu negocio en Madrid. Son menos de 2 minutos.", icon: "📝" },
                { step: "02", title: "La IA genera tu web", desc: "Nuestro motor de IA crea contenido profesional, optimizado para SEO local y tu sector específico.", icon: "✨" },
                { step: "03", title: "Descarga y publica", desc: "Previsualiza tu web en directo, descarga el HTML y publícala gratis en Vercel o GitHub Pages.", icon: "🚀" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "#EFF4FF" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1" style={{ color: "#D4AF37", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>PASO {item.step}</div>
                    <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>{item.title}</h3>
                    <p style={{ color: "#64748B", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
                style={{ background: "#1E3A8A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 8px 32px rgba(30,58,138,0.2)" }}
              >
                <Sparkles className="w-5 h-5" style={{ color: "#D4AF37" }} />
                Empezar ahora — es gratis
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24" style={{ background: "#FAFAFA" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "#EFF4FF", color: "#1E3A8A" }}>
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>
                Todo lo que necesita tu negocio local
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="bg-white p-6 rounded-2xl border transition-all group cursor-default"
                    style={{ borderColor: "#E2E8F0" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(30,58,138,0.3)"
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(30,58,138,0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E2E8F0"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all" style={{ background: "#EFF4FF", color: "#1E3A8A" }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section id="sectores" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "#EFF4FF", color: "#1E3A8A" }}>
                Sectores
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>
                Para todo tipo de negocio en Madrid
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
                Diseños y contenidos especializados para cada sector. La IA conoce tu industria.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {SECTORS_PREVIEW.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setStep("form")}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all"
                  style={{ background: "#FAFAFA", borderColor: "#E2E8F0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#EFF4FF"
                    e.currentTarget.style.borderColor = "rgba(30,58,138,0.3)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FAFAFA"
                    e.currentTarget.style.borderColor = "#E2E8F0"
                  }}
                >
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "#374151" }}>{s.name}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-sm" style={{ color: "#94A3B8" }}>
              +6 sectores más disponibles — Fontaneros, Farmacias, Arquitectos, Hoteles...
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonios" className="py-24" style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #0F2055 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold border mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.2)" }}>
                Testimonios
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                Negocios madrileños que ya confían en nosotros
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl p-6 border" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ fill: "#D4AF37", color: "#D4AF37" }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "rgba(255,255,255,0.82)" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "#EFF4FF" }}>
              <Sparkles className="w-8 h-8" style={{ color: "#1E3A8A" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>
              Tu negocio en Madrid merece una gran web
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "#64748B" }}>
              Únete a 10.000 negocios madrileños con presencia online profesional. Gratis. En minutos.
            </p>
            <button
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 group"
              style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 8px 32px rgba(212,175,55,0.4)" }}
            >
              Crear mi web GRATIS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm" style={{ color: "#94A3B8" }}>
              {["Sin tarjeta de crédito", "Sin instalar nada", "Descarga inmediata"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t py-10" style={{ background: "#0F172A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#1E3A8A" }}>
                  <MapPin className="w-4 h-4" style={{ color: "#D4AF37" }} />
                </div>
                <div>
                  <span className="font-bold text-sm" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "white" }}>
                    Madrid<span style={{ color: "#D4AF37" }}>WebMaker</span>
                  </span>
                  <p className="text-xs" style={{ color: "#64748B" }}>Webs profesionales para PYMES Madrid</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm" style={{ color: "#64748B" }}>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Contacto</a>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Madrid, España
                </span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs" style={{ color: "#475569" }}>
              &copy; {new Date().getFullYear()} MadridWebMaker. Hecho con dedicación para negocios madrileños.
            </div>
          </div>
        </footer>
      </div>
    )
  }

  /* ─── FORM ──────────────────────────────────────────────────────── */
  if (step === "form") {
    return (
      <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
        <SiteHeader />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "#EFF4FF", color: "#1E3A8A" }}>
                Generador con IA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}>
                Crea tu web profesional ahora
              </h2>
              <p style={{ color: "#64748B", lineHeight: 1.65 }}>
                Completa el formulario y nuestra IA generará una web profesional, optimizada para SEO local en Madrid.
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(30,58,138,0.08)" }}>
              <div className="p-8 sm:p-10">
                <BusinessForm onSubmit={handleFormSubmit} isLoading={isGenerating} />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm" style={{ color: "#94A3B8" }}>
              {["100% gratuito", "Sin registro previo", "Descarga inmediata", "RGPD compliant"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  /* ─── GENERATING ────────────────────────────────────────────────── */
  if (step === "generating") {
    return (
      <div className="min-h-screen" style={{ background: "#FAFAFA" }}>
        <SiteHeader />
        <main className="pt-16 flex items-center justify-center min-h-screen">
          <div className="max-w-xl w-full px-4">
            <GeneratingScreen businessName={formData?.name || "tu negocio"} />
          </div>
        </main>
      </div>
    )
  }

  /* ─── PREVIEW ───────────────────────────────────────────────────── */
  return (
    <div className="h-screen flex flex-col" style={{ background: "#FAFAFA" }}>
      <SiteHeader />
      <main className="flex-1 pt-16 overflow-hidden">
        <WebsitePreview
          htmlContent={htmlContent}
          businessName={formData?.name || "Negocio"}
          onExport={() => setShowExportSheet(true)}
        />
      </main>

      <Sheet open={showExportSheet} onOpenChange={setShowExportSheet}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
          <ExportPanel
            htmlContent={htmlContent}
            businessName={formData?.name || "Negocio"}
            onRegenerate={handleRegenerate}
            onStartOver={handleStartOver}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
