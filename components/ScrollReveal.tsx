'use client';

import { useEffect } from 'react';

// Blocks that rise into view as they are scrolled to. The look of each lives in globals.css (Motion);
// this only flips data-reveal from "out" to "in" when an element enters the viewport.
const TARGETS = [
  '.section-head', '.category', '.product-card', '.campaign-copy', '.marquee', '.tabs', '.toolbar',
  '.results-label', '.cart-row', '.summary', '.form-section',
  '.footer-logo', '.footer-grid > div', '.legal',
].join(',');

// Elements that enter together (a grid row, the footer columns) cascade in reading order
const STAGGER_S = .08;
const MAX_STAGGER_S = .48;

export default function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(entries => {
      entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.style.setProperty('--reveal-delay', `${Math.min(i * STAGGER_S, MAX_STAGGER_S)}s`);
          el.dataset.reveal = 'in';
        });
    }, { threshold: .15 });

    // On first load, anything already on screen was painted by the server and is left as is, so content
    // never blinks out while the page hydrates. Later arrivals (a new route, cart rows, search results) animate in.
    const track = (el: HTMLElement, initial: boolean) => {
      if (el.dataset.reveal === 'in') return;
      if (!el.dataset.reveal) {
        if (initial) {
          const box = el.getBoundingClientRect();
          if (box.top < window.innerHeight && box.bottom > 0) return;
        }
        el.dataset.reveal = 'out';
      }
      observer.observe(el);
    };

    const scan = (root: Element, initial: boolean) => {
      if (root.matches(TARGETS)) track(root as HTMLElement, initial);
      root.querySelectorAll<HTMLElement>(TARGETS).forEach(el => track(el, initial));
    };

    scan(document.body, true);
    const mutations = new MutationObserver(records => {
      for (const record of records) record.addedNodes.forEach(node => { if (node instanceof Element) scan(node, false); });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => { mutations.disconnect(); observer.disconnect(); };
  }, []);

  return null;
}
