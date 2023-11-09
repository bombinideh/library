import { useEffect, useRef, useState } from "react";

export default function useSize<T extends Element = HTMLDivElement>() {
  const elementRef = useRef<T>(null);
  const [width, setWidth] = useState("0px");
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const [sizes] = entry.borderBoxSize;

          setWidth(`${sizes.inlineSize}px`);
          setHeight(`${sizes.blockSize}px`);
        });
      });

      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [elementRef.current]);

  return [elementRef, height, width] as const;
}
