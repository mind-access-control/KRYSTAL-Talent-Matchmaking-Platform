"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.register": "Register",
    "nav.login": "Login",
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.portfolio": "Portfolio",
    "nav.projects": "Projects",
    "nav.settings": "Settings",
    "nav.logout": "Logout",

    // Landing Page
    "hero.title": "Discover Your Next Star. Unleash Your Potential.",
    "hero.subtitle": "AI-powered talent matchmaking platform connecting businesses with creative professionals",
    "hero.cta": "Get Started",
    "features.ai": "AI-Powered Matching",
    "features.portfolio": "Unified Portfolio",
    "features.collaboration": "Seamless Collaboration",

    // Auth
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.accountType": "Account Type",
    "auth.talent": "Talent",
    "auth.business": "Business",
    "auth.register": "Register",
    "auth.login": "Login",
    "auth.alreadyAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",
    "auth.forgotPassword": "Forgot Password?",

    // Profile
    "profile.name": "Name",
    "profile.location": "Location",
    "profile.age": "Age",
    "profile.gender": "Gender",
    "profile.languages": "Languages",
    "profile.category": "Category",
    "profile.skills": "Skills",
    "profile.rates": "Rates",
    "profile.availability": "Availability",
    "profile.biography": "Biography",
    "profile.save": "Save Changes",

    // Projects
    "project.title": "Project Title",
    "project.description": "Description",
    "project.budget": "Budget",
    "project.create": "Create Project",
    "project.publish": "Publish Project",
    "project.draft": "Save Draft",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.upload": "Upload",
    "common.connect": "Connect",
    "common.connected": "Connected",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.register": "Registrarse",
    "nav.login": "Iniciar Sesión",
    "nav.dashboard": "Panel",
    "nav.profile": "Perfil",
    "nav.portfolio": "Portafolio",
    "nav.projects": "Proyectos",
    "nav.settings": "Configuración",
    "nav.logout": "Cerrar Sesión",

    // Landing Page
    "hero.title": "Descubre Tu Próxima Estrella. Desbloquea Tu Potencial.",
    "hero.subtitle":
      "Plataforma de emparejamiento de talento impulsada por IA que conecta empresas con profesionales creativos",
    "hero.cta": "Comenzar",
    "features.ai": "Emparejamiento con IA",
    "features.portfolio": "Portafolio Unificado",
    "features.collaboration": "Colaboración Fluida",

    // Auth
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.accountType": "Tipo de Cuenta",
    "auth.talent": "Talento",
    "auth.business": "Empresa",
    "auth.register": "Registrarse",
    "auth.login": "Iniciar Sesión",
    "auth.alreadyAccount": "¿Ya tienes una cuenta?",
    "auth.noAccount": "¿No tienes una cuenta?",
    "auth.forgotPassword": "¿Olvidaste tu contraseña?",

    // Profile
    "profile.name": "Nombre",
    "profile.location": "Ubicación",
    "profile.age": "Edad",
    "profile.gender": "Género",
    "profile.languages": "Idiomas",
    "profile.category": "Categoría",
    "profile.skills": "Habilidades",
    "profile.rates": "Tarifas",
    "profile.availability": "Disponibilidad",
    "profile.biography": "Biografía",
    "profile.save": "Guardar Cambios",

    // Projects
    "project.title": "Título del Proyecto",
    "project.description": "Descripción",
    "project.budget": "Presupuesto",
    "project.create": "Crear Proyecto",
    "project.publish": "Publicar Proyecto",
    "project.draft": "Guardar Borrador",

    // Common
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.view": "Ver",
    "common.upload": "Subir",
    "common.connect": "Conectar",
    "common.connected": "Conectado",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
