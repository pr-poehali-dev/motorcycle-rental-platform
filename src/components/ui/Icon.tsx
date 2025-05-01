
import * as React from "react";
import { icons } from "lucide-react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  fallback?: string;
}

const Icon = ({ name, fallback, size = 24, ...props }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons] || (fallback ? icons[fallback as keyof typeof icons] : null);

  if (!LucideIcon) {
    console.error(`Иконка "${name}" не найдена`);
    return null;
  }

  return <LucideIcon size={size} {...props} />;
};

export default Icon;
