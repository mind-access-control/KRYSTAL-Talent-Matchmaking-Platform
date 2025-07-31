"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

interface LanguageWrapperProps {
  children: React.ReactNode;
}

export function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
