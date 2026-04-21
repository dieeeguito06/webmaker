"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const STEPS = [
  { label: "Analizando tu negocio y sector", sub: "Reconociendo tu industria en Madrid" },
  { label: "Generando contenido con IA", sub: "Creando textos profesionales y optimizados" },
  { label: "Optimizando SEO local Madrid", sub: "Incorporando keywords y schema markup" },
  { label: "Creando servicios y testimonios", sub: "Personalizando para tu sector específico" },
  { label: "Configurando diseño responsive", sub: "Adaptando para móvil, tablet y escritorio" },
  { label: "Preparando web para descarga", sub: "Integrando WhatsApp, Maps y Analytics" },
]

const TIPS = [
  "Tu web incluirá meta tags optimizados con tu barrio de Madrid.",
  "La IA genera 3 testimonios realistas para tu sector.",
  "WhatsApp Business se integrará con un mensaje personalizado.",
  "Google Maps se embebe directamente con tu dirección.",
  "El schema markup LocalBusiness mejora tu posición en Google.",
  "Tu web descargada funciona sin conexión a internet.",
]

interface GeneratingScreenProps {
  businessName: string
}

export function GeneratingScreen({ businessName }: GeneratingScreenProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [tipIndex, setTipIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    const totalMs = 5000
    const stepMs = totalMs / STEPS.length

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100))
    }, totalMs / 100)

    const advance = () => {
      setCompleted((prev) => [...prev, current])
      current++
      if (current < STEPS.length) {
        setActiveStep(current)
        setTimeout(advance, stepMs)
      }
    }

    setTimeout(advance, stepMs)

    const tipTimer = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearInterval(tipTimer)
    }
  }, [])

  return (
    <div className="w-full text-center">
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-10" style={{ height: "160px" }}>
        {[160, 128, 96].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `2px solid rgba(30,58,138,${0.08 + i * 0.06})`,
              animation: `spin ${3 + i * 1.5}s linear infinite ${i % 2 === 1 ? "reverse" : ""}`,
            }}
          />
        ))}
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg z-10"
          style={{
            background: "linear-gradient(135deg, #1E3A8A, #3B5EC6)",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          ✨
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <h2
        className="text-2xl font-black mb-2"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", color: "#0F172A" }}
      >
        Creando la web de
      </h2>
      <p className="text-lg font-bold mb-8" style={{ color: "#1E3A8A" }}>
        {businessName}
      </p>

      {/* Progress bar */}
      <div className="w-full rounded-full h-2.5 mb-3 overflow-hidden" style={{ background: "#E2E8F0" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #1E3A8A, #D4AF37)",
          }}
        />
      </div>
      <p className="text-sm font-semibold mb-8" style={{ color: "#64748B" }}>{progress}% completado</p>

      {/* Steps list */}
      <div className="text-left space-y-2.5 mb-8 max-w-sm mx-auto">
        {STEPS.map((s, i) => {
          const isDone = completed.includes(i)
          const isActive = activeStep === i && !isDone
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
              style={{
                background: isActive ? "#EFF4FF" : isDone ? "transparent" : "transparent",
                border: isActive ? "1px solid rgba(30,58,138,0.2)" : "1px solid transparent",
              }}
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" style={{ color: "#1E3A8A" }} />
                ) : isActive ? (
                  <div
                    className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "#1E3A8A", borderTopColor: "transparent" }}
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full" style={{ background: "#E2E8F0" }} />
                )}
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: isDone ? "#64748B" : isActive ? "#1E3A8A" : "#94A3B8" }}
                >
                  {s.label}
                </div>
                {isActive && (
                  <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{s.sub}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rotating tip */}
      <div
        className="px-5 py-3 rounded-2xl text-sm max-w-sm mx-auto"
        style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", color: "#64748B" }}
      >
        <span className="font-semibold" style={{ color: "#A88A20" }}>Sabías que: </span>
        {TIPS[tipIndex]}
      </div>
    </div>
  )
}
