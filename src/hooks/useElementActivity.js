import { useEffect, useRef, useState } from 'react';

export function useElementActivity(rootMargin = '250px') {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    if (!('IntersectionObserver' in window)) {
      setHasEntered(true);
      setInView(true);
      return () => document.removeEventListener('visibilitychange', updateVisibility);
    }

    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        preloadObserver.disconnect();
      }
    }, { rootMargin });
    const activityObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (ref.current) {
      preloadObserver.observe(ref.current);
      activityObserver.observe(ref.current);
    }
    return () => {
      preloadObserver.disconnect();
      activityObserver.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [rootMargin]);

  return { ref, hasEntered, isActive: inView && pageVisible };
}
