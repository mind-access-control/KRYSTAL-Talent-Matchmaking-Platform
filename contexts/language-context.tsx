"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    "nav.network": "Network",
    "nav.favorites": "Favorites",
    "nav.socialMedia": "Social Media",
    "nav.messages": "Messages",
    "nav.aiPreferences": "AI Preferences",
    "nav.users": "Users",
    "nav.aiMonitor": "AI Monitor",

    // Landing Page
    "hero.title": "Discover Your Next Star. Unleash Your Potential.",
    "hero.subtitle":
      "AI-powered talent matchmaking platform connecting businesses with creative professionals",
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

    // Network
    "network.title": "Network",
    "network.subtitle":
      "Connect with companies and other talented professionals",
    "network.companies": "Companies",
    "network.talent": "Talent",
    "network.connected": "Connected",
    "network.connect": "Connect",
    "network.message": "Message",
    "network.findCompanies": "Find Companies",
    "network.findTalent": "Find Talent",
    "network.searchCompanies": "Search companies...",
    "network.searchTalent": "Search talent...",
    "network.selectIndustry": "Select industry",
    "network.selectCategory": "Select category",
    "network.sortBy": "Sort by",
    "network.matchScore": "Match Score",
    "network.projectCount": "Project Count",
    "network.followers": "Followers",
    "network.engagement": "Engagement Rate",
    "network.name": "Name",
    "network.totalTalent": "Total Talent",
    "network.highMatch": "High Match",
    "network.available": "Available",
    "network.noResults": "No results found",
    "network.tryAdjusting": "Try adjusting your search criteria",
    "network.noConnections": "No connections available at the moment",
    "network.connectionRequestSent":
      "Your connection request has been sent successfully.",

    // Messages
    "messages.title": "Messages",
    "messages.subtitle": "Manage your conversations with talent",
    "messages.newMessage": "New Message",
    "messages.searchConversations": "Search conversations...",
    "messages.conversations": "Conversations",
    "messages.noConversations": "No conversations found",
    "messages.tryAdjusting": "Try adjusting your search terms",
    "messages.startConnecting":
      "Start connecting with talent to see your messages here",
    "messages.talent": "Talent",
    "messages.unread": "unread",

    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.systemSettings": "System Settings",
    "dashboard.runBackup": "Run Backup",
    "dashboard.monitorPerformance":
      "Monitor platform performance and manage system operations.",
    "dashboard.systemAlerts": "System Alerts",
    "dashboard.systemAlertsDesc": "Recent system notifications and alerts",
    "dashboard.platformMetrics": "Platform Metrics",
    "dashboard.platformMetricsDesc": "Key performance indicators",
    "dashboard.recentUsers": "Recent User Registrations",
    "dashboard.recentUsersDesc": "Latest users who joined the platform",
    "dashboard.totalUsers": "Total Users",
    "dashboard.activePlatformUsers": "Active platform users",
    "dashboard.talentUsers": "Talent Users",
    "dashboard.activeTalentUsers": "Active talent users",
    "dashboard.businessUsers": "Business Users",
    "dashboard.activeBusinessUsers": "Active business users",
    "dashboard.activeProjects": "Active Projects",
    "dashboard.currentlyRunning": "Currently running",
    "dashboard.platformRevenue": "Platform Revenue",
    "dashboard.thisMonth": "This month",
    "dashboard.systemHealth": "System Health",
    "dashboard.uptimeThisMonth": "Uptime this month",
    "dashboard.fromLastMonth": "from last month",

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
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.all": "All",
    "common.more": "more",
    "common.projects": "projects completed",
    "common.engagement": "engagement",
    "common.followers": "followers",
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
    "nav.network": "Red",
    "nav.favorites": "Favoritos",
    "nav.socialMedia": "Redes Sociales",
    "nav.messages": "Mensajes",
    "nav.aiPreferences": "Preferencias IA",
    "nav.users": "Usuarios",
    "nav.aiMonitor": "Monitor IA",

    // Dashboard
    "dashboard.welcome": "Bienvenido",
    "dashboard.systemSettings": "Configuración del Sistema",
    "dashboard.runBackup": "Ejecutar Respaldo",
    "dashboard.monitorPerformance":
      "Monitorea el rendimiento de la plataforma y gestiona las operaciones del sistema.",
    "dashboard.systemAlerts": "Alertas del Sistema",
    "dashboard.systemAlertsDesc":
      "Notificaciones y alertas recientes del sistema",
    "dashboard.platformMetrics": "Métricas de la Plataforma",
    "dashboard.platformMetricsDesc": "Indicadores clave de rendimiento",
    "dashboard.recentUsers": "Registros Recientes de Usuarios",
    "dashboard.recentUsersDesc":
      "Últimos usuarios que se unieron a la plataforma",
    "dashboard.totalUsers": "Total de Usuarios",
    "dashboard.activePlatformUsers": "Usuarios activos de la plataforma",
    "dashboard.talentUsers": "Usuarios Talento",
    "dashboard.activeTalentUsers": "Usuarios talento activos",
    "dashboard.businessUsers": "Usuarios Empresa",
    "dashboard.activeBusinessUsers": "Usuarios empresa activos",
    "dashboard.activeProjects": "Proyectos Activos",
    "dashboard.currentlyRunning": "Actualmente ejecutándose",
    "dashboard.platformRevenue": "Ingresos de la Plataforma",
    "dashboard.thisMonth": "Este mes",
    "dashboard.systemHealth": "Salud del Sistema",
    "dashboard.uptimeThisMonth": "Tiempo activo este mes",
    "dashboard.fromLastMonth": "del mes pasado",

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

    // Network
    "network.title": "Red",
    "network.subtitle":
      "Conéctate con empresas y otros profesionales talentosos",
    "network.companies": "Empresas",
    "network.talent": "Talento",
    "network.connected": "Conectado",
    "network.connect": "Conectar",
    "network.message": "Mensaje",
    "network.findCompanies": "Encontrar Empresas",
    "network.findTalent": "Encontrar Talento",
    "network.searchCompanies": "Buscar empresas...",
    "network.searchTalent": "Buscar talento...",
    "network.selectIndustry": "Seleccionar industria",
    "network.selectCategory": "Seleccionar categoría",
    "network.sortBy": "Ordenar por",
    "network.matchScore": "Puntuación de Coincidencia",
    "network.projectCount": "Cantidad de Proyectos",
    "network.followers": "Seguidores",
    "network.engagement": "Tasa de Participación",
    "network.name": "Nombre",
    "network.totalTalent": "Talento Total",
    "network.highMatch": "Alta Coincidencia",
    "network.available": "Disponible",
    "network.noResults": "No se encontraron resultados",
    "network.tryAdjusting": "Intenta ajustar tus criterios de búsqueda",
    "network.noConnections": "No hay conexiones disponibles en este momento",
    "network.connectionRequestSent":
      "Tu solicitud de conexión ha sido enviada exitosamente.",

    // Messages
    "messages.title": "Mensajes",
    "messages.subtitle": "Gestiona tus conversaciones con talento",
    "messages.newMessage": "Nuevo Mensaje",
    "messages.searchConversations": "Buscar conversaciones...",
    "messages.conversations": "Conversaciones",
    "messages.noConversations": "No se encontraron conversaciones",
    "messages.tryAdjusting": "Intenta ajustar tus términos de búsqueda",
    "messages.startConnecting":
      "Comienza a conectar con talento para ver tus mensajes aquí",
    "messages.talent": "Talento",
    "messages.unread": "no leídos",

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
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.all": "Todos",
    "common.more": "más",
    "common.projects": "proyectos completados",
    "common.engagement": "participación",
    "common.followers": "seguidores",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Initialize language from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("krystal-language");
      if (saved && (saved === "en" || saved === "es")) {
        setLanguage(saved as Language);
      } else {
        // Set default to English if no language is saved
        localStorage.setItem("krystal-language", "en");
        setLanguage("en");
      }
    }
  }, []);

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("krystal-language", lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
