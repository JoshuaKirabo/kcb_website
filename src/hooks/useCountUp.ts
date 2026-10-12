import { useEffect, useState } from "react";

// Counts from 0 up to `to` once `start` flips true. Fast at first, then easing into the final number so it lands rather than stops.
export function useCountUp(to: number, start: boolean, delay = 0, duration = 1800)
  {
    const [value, setValue] = useState(0);
    const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    useEffect(() =>
      {
        if(!start || reduced) return;

        let frame = 0;
        let begin = 0;

        function tick(now: number)
          {
            if(!begin) begin = now;

            const progress = Math.min((now - begin) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);

            setValue(Math.round(eased * to));
            if(progress < 1) frame = requestAnimationFrame(tick);
          }

        const timer = window.setTimeout(() => { frame = requestAnimationFrame(tick); }, delay);

        return () =>
          {
            window.clearTimeout(timer);
            cancelAnimationFrame(frame);
          };
      }, [to, start, delay, duration, reduced]);

    // With reduced motion there's no count, the final number just appears with the fade.
    if(reduced) return start ? to : 0;

    return value;
  }
