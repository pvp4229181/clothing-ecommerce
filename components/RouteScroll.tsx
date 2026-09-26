'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

// Start each new page at the top within the navigation's own commit. Left to the router, the scroll lands after
// the page transition has captured the incoming page, which then fades in at the old offset and jumps.
// Back/forward navigations are left alone so the browser can restore the reader's place.
export default function RouteScroll() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => { fromHistory.current = true; };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (fromHistory.current) fromHistory.current = false;
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
