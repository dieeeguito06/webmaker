"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check, RefreshCw, ExternalLink, ArrowLeft } from "lucide-react"

interface ExportPanelProps {
  htmlContent: string
  businessName: string
  onRegenerate: () => void
  onStartOver: () => void
}

const INCLUDED = [
  { icon: "🔍", label: "SEO Madrid optimizado" },
  { icon: "📱", label: "100% Responsive" },
  { icon: "⚡", label: "WhatsApp Business" },
  { icon: "🗺️", label: "Google Maps integrado" },
  { icon: "🌍", label: "Bilingüe ES + EN" },
  { icon: "🔒", label: "RGPD compliant" },
  { icon: "📊", label: "Google Analytics listo" },
  { icon: "🏷️", label: "Schema.org LocalBusiness" },
]

const HOSTS = [
  { name: "Tiiny Host", sub: "Sube tu HTML directamente — gratis", url: "https://tiiny.host", badge: "Más fácil" },
  { name: "Vercel", sub: "HTTPS automático, CDN global — gratis", url: "https://vercel.com/new", badge: null },
  { name: "GitHub Pages", sub: "Hosting gratis ilimitado con Git", url: "https://pages.github.com", badge: null },
  { name: "Netlify Drop", sub: "Arrastra el HTML y listo — gratis", url: "https://app.netlify.com/drop", badge: null },
]

export function ExportPanel({ htmlContent, businessName, onRegenerate, onStartOver }: ExportPanelProps) {
  const [copied, setCopied] = useState(false)

  const downloadHTML = () => {
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${businessName.toLowerCase().replace(/\s+/g, "-")}-madrid.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-100" style={{ background: "linear-gradient(135deg, #1E3A8A, #0F2055)" }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Web generada con éxito</span>
        </div>
        <h3
          className="text-lg font-black text-white"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {businessName}
        </h3>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
          Archivo HTML autocontenido · {Math.round(htmlContent.length / 1024)} KB
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Download actions */}
        <div className="space-y-2.5">
          <button
            onClick={downloadHTML}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02]"
            style={{
              background: "#D4AF37",
              color: "#0F172A",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              boxShadow: "0 6px 20px rgba(212,175,55,0.35)",
            }}
          >
            <Download className="w-4 h-4" />
            Descargar {businessName.split(" ")[0]}.html
          </button>

          <button
            onClick={copyHTML}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm border transition-all"
            style={{
              border: "1.5px solid #E2E8F0",
              background: "white",
              color: copied ? "#10B981" : "#374151",
            }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "¡Copiado al portapapeles!" : "Copiar código HTML"}
          </button>
        </div>

        {/* Included features */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Incluido en tu web</p>
          <div className="grid grid-cols-2 gap-2">
            {INCLUDED.map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-xs font-medium" style={{ color: "#374151" }}>
                <span>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Hosting options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>Dónde publicarla (gratis)</p>
          <div className="space-y-2">
            {HOSTS.map((h) => (
              <a
                key={h.name}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border transition-all group"
                style={{ border: "1px solid #E2E8F0", background: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(30,58,138,0.3)"; e.currentTarget.style.background = "#EFF4FF" }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "white" }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: "#0F172A" }}>{h.name}</span>
                    {h.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#D4AF37", color: "#0F172A" }}>
                        {h.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{h.sub}</p>
                </div>
                <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: "#94A3B8" }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-slate-100 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onStartOver}
          className="flex-1 text-slate-500 gap-1.5 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Nueva web
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          className="flex-1 gap-1.5 text-xs border-slate-200 text-slate-600"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerar
        </Button>
      </div>
    </div>
  )
}
