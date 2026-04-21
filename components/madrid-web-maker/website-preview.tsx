"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Tablet, Smartphone, ExternalLink, Download } from "lucide-react"

type Device = "desktop" | "tablet" | "mobile"

const DEVICES: { key: Device; label: string; icon: React.ReactNode; width: string }[] = [
  { key: "desktop", label: "Escritorio", icon: <Monitor className="w-4 h-4" />, width: "100%" },
  { key: "tablet", label: "Tablet", icon: <Tablet className="w-4 h-4" />, width: "768px" },
  { key: "mobile", label: "Móvil", icon: <Smartphone className="w-4 h-4" />, width: "390px" },
]

interface WebsitePreviewProps {
  htmlContent: string
  businessName: string
  onExport: () => void
}

export function WebsitePreview({ htmlContent, businessName, onExport }: WebsitePreviewProps) {
  const [device, setDevice] = useState<Device>("desktop")

  const openInNewTab = () => {
    const win = window.open("", "_blank")
    if (win) {
      win.document.write(htmlContent)
      win.document.close()
    }
  }

  const current = DEVICES.find((d) => d.key === device)!

  return (
    <div className="h-full flex flex-col" style={{ background: "#F1F5F9" }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-2 px-4 py-1 rounded-full text-xs text-slate-400 font-medium" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", maxWidth: "240px" }}>
            {businessName.toLowerCase().replace(/\s+/g, "-")}.es
          </div>
        </div>

        {/* Device selector */}
        <div className="flex items-center gap-1 px-1 py-1 rounded-xl" style={{ background: "#F1F5F9" }}>
          {DEVICES.map((d) => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: device === d.key ? "white" : "transparent",
                color: device === d.key ? "#1E3A8A" : "#94A3B8",
                boxShadow: device === d.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {d.icon}
              <span className="hidden sm:inline">{d.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={openInNewTab} className="h-8 text-xs gap-1.5 text-slate-500">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Abrir</span>
          </Button>
          <button
            onClick={onExport}
            className="h-8 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105"
            style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 2px 10px rgba(212,175,55,0.3)" }}
          >
            <Download className="w-3.5 h-3.5" />
            Descargar web
          </button>
        </div>
      </div>

      {/* Iframe area */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300"
          style={{
            width: current.width,
            maxWidth: "100%",
            height: "100%",
            minHeight: "600px",
          }}
        >
          <iframe
            srcDoc={htmlContent}
            title={`Preview — ${businessName}`}
            className="w-full h-full"
            style={{ border: "none", minHeight: "600px" }}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  )
}
