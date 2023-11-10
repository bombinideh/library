import { RefObject, useCallback, useEffect } from "react";

interface UseClickOutsideProps {
  state: boolean;
  clearState: () => void;
  ref: RefObject<Element>;
  close?: "inElement" | "outElement";
}

const defaultProps: Required<Pick<UseClickOutsideProps, "close">> = {
  close: "outElement",
};

export default function useClickOutside(props: UseClickOutsideProps) {
  const { state, clearState, ref, close } = { ...defaultProps, ...props };
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

    if (state)
      clickEvents.forEach(type => document.addEventListener(type, callback));
    else removeEvents();

    return () => removeEvents();
  }, [state]);
}
