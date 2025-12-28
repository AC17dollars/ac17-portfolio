import { useEffect, useState, RefObject } from 'react';

export function useOnScreen(ref: RefObject<HTMLElement | null>, threshold: number = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Optional: disconnect once intersecting if we only want the animation to play once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return isIntersecting;
}
