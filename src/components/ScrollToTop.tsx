import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo(0, 0);
    let attempts = 0;
    let timeout: number | undefined;
    const scrollToAnchor = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
      } else if (attempts < 20) {
        attempts += 1;
        timeout = window.setTimeout(scrollToAnchor, 50);
      }
    };
    scrollToAnchor();

    return () => {
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}
