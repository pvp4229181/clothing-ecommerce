'use client';

import { useEffect, useRef } from 'react';
import { heroCollections } from './heroData';

export default function HeroCategories({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const list = useRef<HTMLElement>(null);
  useEffect(() => {
    // Scroll only the (mobile) strip; scrollIntoView would also scroll the hero and the page.
    const nav = list.current;
    const button = nav?.querySelector<HTMLButtonElement>(`[data-index="${active}"]`);
    if (!nav || !button || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: button.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return <nav ref={list} className="ch-categories" aria-label="Featured collections">
    {heroCollections.map((item, index) => <button
      type="button"
      key={item.id}
      data-index={index}
      className={index === active ? 'is-active' : ''}
      aria-current={index === active ? 'true' : undefined}
      onClick={() => onSelect(index)}
    ><span>{item.number}</span><strong>{item.label}</strong><i aria-hidden="true" /></button>)}
  </nav>;
}
