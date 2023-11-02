import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}
