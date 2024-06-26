import { RefObject, useCallback, useEffect } from "react";

interface UseClickOutsideProps {
  state: boolean;
  clearState: () => void;
  ref: RefObject<Element>;
  close?: "inElement" | "outElement";
  active?: boolean;
}

const defaultProps: Required<Pick<UseClickOutsideProps, "close" | "active">> = {
  close: "outElement",
  active: true,
};

export default function useClickOutside(props: UseClickOutsideProps) {
  const { state, clearState, ref, close, active } = { ...defaultProps, ...props };
  const callback = useCallback((event: Event) => {
    const target = event.target as Node;
    const options = {
      inElement: () => {
        if (ref?.current && ref?.current.contains(target)) clearState();
      },
      outElement: () => {
        if (ref?.current && !ref?.current.contains(target)) clearState();
      },
    };

    options[close]();
  }, []);
  const clickEvents = ["touchstart", "mousedown"];

  useEffect(() => {
    const removeEvents = () => {
      clickEvents.forEach(type => document.removeEventListener(type, callback));
    };

    if (active && state)
      clickEvents.forEach(type => document.addEventListener(type, callback));
    else removeEvents();

    return () => removeEvents();
  }, [state]);
}
