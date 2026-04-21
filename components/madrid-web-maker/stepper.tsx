"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  label: string
  sublabel: string
}

const STEPS: Step[] = [
  { id: 1, label: "Tu Negocio", sublabel: "Información básica" },
  { id: 2, label: "Ubicación", sublabel: "Contacto y dirección" },
  { id: 3, label: "Servicios", sublabel: "Horario y sector" },
  { id: 4, label: "Estilo", sublabel: "Diseño y redes" },
]

interface StepperProps {
  currentStep: number
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const isPending = currentStep < step.id

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isCurrent &&
                    "bg-background border-primary text-primary shadow-[0_0_0_4px_rgba(var(--madrid-red),0.12)]",
                  isPending && "bg-background border-border text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span>{step.id}</span>}
              </div>
              <div className="text-center hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{step.sublabel}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
