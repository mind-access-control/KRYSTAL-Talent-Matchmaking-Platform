import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react"; // Importa LucideIcon para tipado
import { useLanguage } from "@/contexts/language-context";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon | React.ReactNode; // Mantenemos el tipo flexible
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatsCardProps) {
  const { t } = useLanguage();
  let renderedIcon: React.ReactNode = null;

  if (icon) {
    // CAMBIO CLAVE: Intentamos renderizar el icono usando React.createElement
    // Si 'icon' es una función (como Users de lucide-react), React.createElement la usará como componente.
    // Si 'icon' ya es un elemento React válido (como <Users />), React.createElement lo devolverá tal cual.
    // Esto es más robusto para casos donde `typeof` o `isValidElement` pueden ser engañosos.
    try {
      if (typeof icon === "function") {
        // Si es una función, la tratamos como un componente LucideIcon
        renderedIcon = React.createElement(icon as LucideIcon, {
          className: "h-4 w-4 text-muted-foreground",
        });
      } else if (React.isValidElement(icon)) {
        // Si ya es un elemento React válido, lo renderizamos directamente
        renderedIcon = icon;
      } else {
        // Si no es una función ni un elemento válido, y es un objeto,
        // esto es el caso problemático que genera el error.
        // En este punto, no podemos renderizarlo y debemos evitar el crash.
        // console.error("StatsCard received an unrenderable icon object:", icon);
        renderedIcon = null; // Renderizamos null para evitar el error
      }
    } catch (e) {
      // En caso de que React.createElement falle por alguna razón inesperada
      // console.error("Error rendering icon in StatsCard:", e, icon);
      renderedIcon = null;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {renderedIcon} {/* Renderizamos el icono ya procesado */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div
            className={`text-xs ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% {t("dashboard.fromLastMonth")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
