import { useEffect, useRef, useState } from "react";

// Same as the original's WOW fade-up: each block rises in once it scrolls into view.
export function useReveal<T extends Element>()
  {
    const ref = useRef<T>(null);
    const [shown, setShown] = useState(false);

    useEffect(() =>
      {
        const node = ref.current;
        if(!node) return;

        const observer = new IntersectionObserver(([entry]) =>
          {
            if(entry.isIntersecting)
              {
                setShown(true);
                observer.disconnect();
              }
          }, { threshold: 0.15 });

        observer.observe(node);
        return () => observer.disconnect();
      }, []);

    return [ref, shown ? " is-revealed" : ""] as const;
  }
