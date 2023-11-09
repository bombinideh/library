import IMGLogomark from "@/assets/logomark.png";
import { appNameAcronym } from "@/config/index.tsx";
import * as Styled from "./styles.ts";

export interface LogoProps {
  className?: string;
  width?: string;
}

export default function Logo({ className, width }: LogoProps) {
  return (
    <Styled.Wrapper
      className={className}
      src={IMGLogomark}
      alt={`Logomarca do ${appNameAcronym}`}
      $width={width}
    />
  );
}
