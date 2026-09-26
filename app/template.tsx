import { ViewTransition } from 'react';

// Route changes crossfade the page content (see "Page transitions" in globals.css); the header stays anchored.
export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition enter="page-enter" exit="page-exit" default="none">{children}</ViewTransition>;
}
