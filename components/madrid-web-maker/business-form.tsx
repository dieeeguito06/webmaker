"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Plus, X } from "lucide-react"
import { SECTORS, COLOR_PRESETS, MADRID_NEIGHBORHOODS, type BusinessFormData } from "@/lib/types"

const DEFAULT_SERVICES: Record<string, string[]> = {
  restaurante: ["Carta de temporada", "Menú del día", "Reservas online", "Servicio a domicilio", "Eventos privados"],
  peluqueria: ["Corte de cabello", "Coloración y mechas", "Tratamientos capilares", "Peinados y recogidos", "Manicura y pedicura"],
  tienda: ["Venta online", "Asesoramiento personalizado", "Devoluciones fáciles", "Programa de fidelidad", "Envío a domicilio"],
  abogado: ["Derecho Civil", "Derecho Laboral", "Derecho Penal", "Consulta gratuita", "Gestión de herencias"],
  gimnasio: ["Clases grupales", "Entrenamiento personal", "Zona de pesas", "Spa y sauna", "Nutrición deportiva"],
  academia: ["Inglés intensivo", "Preparación exámenes", "Clases online", "Grupos reducidos", "Material incluido"],
  clinica: ["Medicina general", "Consulta especializada", "Urgencias", "Análisis y pruebas", "Telemedicina"],
  hotel: ["Habitaciones dobles", "Desayuno incluido", "WiFi gratis", "Parking", "Traslado aeropuerto"],
  fontanero: ["Reparación urgente", "Instalación fontanería", "Desatascos", "Calefacción", "Gas y climatización"],
  cafeteria: ["Cafés de especialidad", "Bollería artesanal", "Desayunos y brunch", "Para llevar", "Catering eventos"],
  inmobiliaria: ["Compra y venta", "Alquiler de pisos", "Valoraciones gratuitas", "Gestión alquileres", "Asesoría hipotecas"],
  arquitecto: ["Proyectos de obra", "Reformas integrales", "Diseño de interiores", "Licencias y permisos", "Consultoría técnica"],
  farmacia: ["Medicamentos con receta", "Parafarmacia", "Dermocosmética", "Nutrición y vitaminas", "Análisis rápidos"],
  otro: ["Servicio principal", "Consulta personalizada", "Presupuesto gratis", "Atención rápida", "Garantía total"],
}

const STEP_LABELS = ["Tu negocio", "Contacto", "Servicios", "Diseño"]

interface BusinessFormProps {
  onSubmit: (data: BusinessFormData) => void
  isLoading: boolean
}

export function BusinessForm({ onSubmit, isLoading }: BusinessFormProps) {
  const [step, setStep] = useState(1)
  const [newService, setNewService] = useState("")
  const [form, setForm] = useState<BusinessFormData>({
    name: "",
    sector: "",
    tagline: "",
    customDescription: "",
    address: "",
    neighborhood: "",
    postalCode: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    services: [],
    openingHours: "Lunes a Viernes: 9:00 - 20:00 | Sábados: 10:00 - 14:00",
    primaryColor: "#1E3A8A",
    fontFamily: "roboto",
    instagram: "",
    facebook: "",
    twitter: "",
    language: "both",
  })

  const set = (key: keyof BusinessFormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSectorSelect = (value: string) => {
    const sector = SECTORS.find((s) => s.value === value)
    set("sector", value)
    set("primaryColor", sector?.color || "#1E3A8A")
    set("services", DEFAULT_SERVICES[value] || [])
  }

  const addService = () => {
    if (newService.trim() && form.services.length < 8) {
      set("services", [...form.services, newService.trim()])
      setNewService("")
    }
  }

  const removeService = (i: number) => set("services", form.services.filter((_, idx) => idx !== i))

  const canNext = () => {
    if (step === 1) return form.name.trim() !== "" && form.sector !== ""
    if (step === 2) return form.address.trim() !== "" && form.phone.trim() !== ""
    if (step === 3) return form.services.length > 0
    return true
  }

  const handleSubmit = () => {
    if (!canNext()) return
    onSubmit(form)
  }

  const inputStyle = {
    border: "1px solid #E2E8F0",
    borderRadius: "10px",
    outline: "none",
    fontSize: "0.9rem",
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center gap-0 mb-10">
        {STEP_LABELS.map((label, i) => {
          const num = i + 1
          const isActive = step === num
          const isDone = step > num
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: isDone ? "#1E3A8A" : isActive ? "#1E3A8A" : "#E2E8F0",
                    color: isDone || isActive ? "white" : "#94A3B8",
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  }}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : num}
                </div>
                <span
                  className="text-xs font-semibold hidden sm:block"
                  style={{ color: isActive ? "#1E3A8A" : isDone ? "#1E3A8A" : "#94A3B8" }}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-0.5 mx-3" style={{ background: step > num ? "#1E3A8A" : "#E2E8F0" }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1 — Basic info */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">
              Nombre del negocio <span style={{ color: "#1E3A8A" }}>*</span>
            </Label>
            <Input
              placeholder="Ej: Restaurante El Rincón Madrileño"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              style={inputStyle}
              className="h-11"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-3 block">
              Sector <span style={{ color: "#1E3A8A" }}>*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SECTORS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => handleSectorSelect(s.value)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left"
                  style={{
                    border: form.sector === s.value ? `2px solid #1E3A8A` : "1.5px solid #E2E8F0",
                    background: form.sector === s.value ? "#EFF4FF" : "white",
                    color: form.sector === s.value ? "#1E3A8A" : "#374151",
                  }}
                >
                  <span>{s.emoji}</span>
                  <span className="truncate">{s.label.split(" & ")[0].split(" ")[0]}{s.label.split(" & ").length > 1 ? "" : ""}{s.label.includes("&") ? " & " + s.label.split("&")[1].trim().split(" ")[0] : ""}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">
              Descripción breve <span className="font-normal text-slate-400">(opcional — la IA generará una si la dejas vacía)</span>
            </Label>
            <Textarea
              placeholder="Cuéntanos algo especial de tu negocio, tu historia, tus valores..."
              value={form.customDescription}
              onChange={(e) => set("customDescription", e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Slogan <span className="font-normal text-slate-400">(opcional)</span></Label>
            <Input
              placeholder="Ej: El sabor de Madrid en cada plato"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              style={inputStyle}
              className="h-11"
            />
          </div>
        </div>
      )}

      {/* Step 2 — Location & contact */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Dirección <span style={{ color: "#1E3A8A" }}>*</span></Label>
            <Input placeholder="Calle Gran Vía 28" value={form.address} onChange={(e) => set("address", e.target.value)} style={inputStyle} className="h-11" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Barrio / Distrito</Label>
              <select
                value={form.neighborhood}
                onChange={(e) => set("neighborhood", e.target.value)}
                className="w-full h-11 px-3 bg-white text-sm text-slate-700"
                style={{ ...inputStyle }}
              >
                <option value="">Seleccionar barrio</option>
                {MADRID_NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Código postal</Label>
              <Input placeholder="28001" value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} style={inputStyle} className="h-11" maxLength={5} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Teléfono <span style={{ color: "#1E3A8A" }}>*</span></Label>
              <Input placeholder="+34 91 234 56 78" value={form.phone} onChange={(e) => set("phone", e.target.value)} style={inputStyle} className="h-11" type="tel" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">WhatsApp</Label>
              <Input placeholder="+34 6xx xxx xxx" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} style={inputStyle} className="h-11" type="tel" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Email</Label>
              <Input placeholder="info@tunegocio.es" value={form.email} onChange={(e) => set("email", e.target.value)} style={inputStyle} className="h-11" type="email" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">Web actual</Label>
              <Input placeholder="https://tunegocio.es" value={form.website} onChange={(e) => set("website", e.target.value)} style={inputStyle} className="h-11" type="url" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Horario</Label>
            <Input placeholder="Lunes a Viernes: 9:00-20:00 | Sábados: 10:00-14:00" value={form.openingHours} onChange={(e) => set("openingHours", e.target.value)} style={inputStyle} className="h-11" />
          </div>
        </div>
      )}

      {/* Step 3 — Services */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold text-slate-700">
                Servicios <span style={{ color: "#1E3A8A" }}>*</span>
                <span className="ml-2 font-normal text-slate-400">({form.services.length}/8)</span>
              </Label>
              {form.sector && (
                <button
                  type="button"
                  onClick={() => set("services", DEFAULT_SERVICES[form.sector] || [])}
                  className="text-xs font-medium px-3 py-1 rounded-lg transition-colors"
                  style={{ background: "#EFF4FF", color: "#1E3A8A" }}
                >
                  Restaurar predeterminados
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
              {form.services.map((svc, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: "#EFF4FF", color: "#1E3A8A", border: "1px solid rgba(30,58,138,0.2)" }}
                >
                  {svc}
                  <button type="button" onClick={() => removeService(i)} className="hover:opacity-70 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            {form.services.length < 8 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Añadir servicio personalizado..."
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService() } }}
                  style={inputStyle}
                  className="h-10"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="h-10 px-4 rounded-xl flex items-center gap-1 text-sm font-semibold flex-shrink-0 transition-all hover:scale-105"
                  style={{ background: "#1E3A8A", color: "white" }}
                >
                  <Plus className="w-4 h-4" /> Añadir
                </button>
              </div>
            )}
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Idioma de la web</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "es", label: "Solo español", flag: "🇪🇸" },
                { value: "en", label: "Solo inglés", flag: "🇬🇧" },
                { value: "both", label: "Bilingüe ES+EN", flag: "🌍" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set("language", opt.value)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    border: form.language === opt.value ? "2px solid #1E3A8A" : "1.5px solid #E2E8F0",
                    background: form.language === opt.value ? "#EFF4FF" : "white",
                    color: form.language === opt.value ? "#1E3A8A" : "#374151",
                  }}
                >
                  <span className="text-xl">{opt.flag}</span>
                  <span className="text-xs text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Design */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-3 block">Color principal</Label>
            <div className="flex flex-wrap gap-3 mb-4">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.name}
                  onClick={() => set("primaryColor", c.value)}
                  className="w-9 h-9 rounded-xl transition-all hover:scale-110"
                  style={{
                    background: c.value,
                    outline: form.primaryColor === c.value ? `3px solid ${c.value}` : "none",
                    outlineOffset: "2px",
                    boxShadow: form.primaryColor === c.value ? `0 0 0 4px rgba(0,0,0,0.08)` : "none",
                  }}
                />
              ))}
              <label
                title="Color personalizado"
                className="w-9 h-9 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                style={{ borderColor: "#CBD5E1", background: form.primaryColor + "22" }}
              >
                <input type="color" value={form.primaryColor} onChange={(e) => set("primaryColor", e.target.value)} className="sr-only" />
                <span className="text-xs font-bold" style={{ color: form.primaryColor }}>+</span>
              </label>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ background: form.primaryColor }} />
              <div>
                <div className="text-sm font-semibold text-slate-700">{form.primaryColor.toUpperCase()}</div>
                <div className="text-xs" style={{ color: "#64748B" }}>Color seleccionado para botones, cabecera y acentos</div>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-3 block">Tipografía</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "roboto", label: "Roboto", style: { fontFamily: "Roboto, sans-serif" } },
                { value: "poppins", label: "Poppins", style: { fontFamily: "'Poppins', sans-serif" } },
                { value: "playfair", label: "Playfair", style: { fontFamily: "'Playfair Display', serif" } },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => set("fontFamily", f.value)}
                  className="p-3 rounded-xl border text-center transition-all"
                  style={{
                    border: form.fontFamily === f.value ? "2px solid #1E3A8A" : "1.5px solid #E2E8F0",
                    background: form.fontFamily === f.value ? "#EFF4FF" : "white",
                    ...f.style,
                  }}
                >
                  <div className="text-lg font-bold" style={{ color: form.fontFamily === f.value ? "#1E3A8A" : "#374151" }}>Aa</div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748B" }}>{f.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700 mb-3 block">Redes sociales <span className="font-normal text-slate-400">(opcionales)</span></Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">📸</span>
                <Input placeholder="@tunegocio o URL de Instagram" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} style={inputStyle} className="h-10" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">📘</span>
                <Input placeholder="URL de Facebook o nombre de página" value={form.facebook} onChange={(e) => set("facebook", e.target.value)} style={inputStyle} className="h-10" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">🐦</span>
                <Input placeholder="@handle de X / Twitter" value={form.twitter} onChange={(e) => set("twitter", e.target.value)} style={inputStyle} className="h-10" />
              </div>
            </div>
          </div>

          {/* Summary box */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #EFF4FF, #F8FAFC)", border: "1px solid rgba(30,58,138,0.12)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4" style={{ color: "#1E3A8A" }} />
              <span className="text-sm font-bold" style={{ color: "#1E3A8A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                Resumen de tu web
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {[
                ["Negocio", form.name || "—"],
                ["Sector", SECTORS.find((s) => s.value === form.sector)?.label || "—"],
                ["Ubicación", form.neighborhood ? `${form.neighborhood}, Madrid` : "Madrid"],
                ["Servicios", `${form.services.length} incluidos`],
                ["Idioma", { es: "Español", en: "Inglés", both: "ES + EN" }[form.language]],
                ["Color", form.primaryColor],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span style={{ color: "#64748B" }}>{k}</span>
                  <span className="font-semibold text-right truncate" style={{ color: "#0F172A" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-slate-500 gap-2">
            <ArrowLeft className="w-4 h-4" /> Anterior
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={() => canNext() && setStep(step + 1)}
            disabled={!canNext()}
            className="flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#1E3A8A", color: "white", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 4px 16px rgba(30,58,138,0.2)" }}
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#D4AF37", color: "#0F172A", fontFamily: "var(--font-montserrat), Montserrat, sans-serif", boxShadow: "0 4px 16px rgba(212,175,55,0.35)" }}
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Generando..." : "Generar mi web con IA"}
          </button>
        )}
      </div>
    </div>
  )
}
