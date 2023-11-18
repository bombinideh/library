import { useCallback, useEffect } from "react";

interface UseEscapeKeyProps {
  state: boolean;
  clearState: () => void;
}

export default function useEscapeKey({ state, clearState }: UseEscapeKeyProps) {
  const callback = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape") clearState();
  }, []);

  useEffect(() => {
    const removeEvent = () => document.removeEventListener("keydown", callback);

    if (state) document.addEventListener("keydown", callback);
    else removeEvent();

    return () => removeEvent();
  }, [state]);
}
