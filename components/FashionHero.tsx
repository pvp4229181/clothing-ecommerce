'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { heroCollections } from '@/data/hero-collections';

const LAST = heroCollections.length - 1;

export default function FashionHero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const reduced = useRef(false);

  const select = useCallback((next: number) => {
    setActive(current => {
      if (current === next) return current;
      setPrevious(current);
      return next;
    });
  }, []);

  const step = useCallback((direction: number) => {
    setActive(current => {
      setPrevious(current);
      return (current + direction + heroCollections.length) % heroCollections.length;
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = media.matches;
    const onChange = () => { reduced.current = media.matches; };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const next = heroCollections[(active + 1) % heroCollections.length];
    const preload = new window.Image();
    preload.src = next.image;
    const clear = window.setTimeout(() => setPrevious(null), reduced.current ? 80 : 950);
    return () => window.clearTimeout(clear);
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !reduced.current) step(1);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, step]);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      const node = root.current;
      if (node && !reduced.current) {
        pointer.current.x += (pointer.current.tx - pointer.current.x) * .055;
        pointer.current.y += (pointer.current.ty - pointer.current.y) * .055;
        const scroll = Math.min(window.scrollY / Math.max(node.offsetHeight, 1), 1);
        node.style.setProperty('--fh-x', pointer.current.x.toFixed(3));
        node.style.setProperty('--fh-y', pointer.current.y.toFixed(3));
        node.style.setProperty('--fh-scroll', scroll.toFixed(3));
      }
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduced.current || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.tx = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    pointer.current.ty = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
  }

  function resetPointer() {
    pointer.current.tx = 0;
    pointer.current.ty = 0;
  }

  const item = heroCollections[active];

  return <section
    ref={root}
    className="fh"
    aria-roledescription="carousel"
    aria-label="New collection categories"
    onPointerMove={onPointerMove}
    onPointerLeave={resetPointer}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={() => setPaused(false)}
  >
    <div className="fh-atmosphere" aria-hidden="true" />
    <div className="fh-grain" aria-hidden="true" />

    <div className="fh-type" aria-hidden="true">
      <span>WEAR</span><span>YOUR</span><span>STORY</span>
    </div>

    <div className="fh-copy" key={`copy-${active}`}>
      <p className="fh-eyebrow">NEW COLLECTION <span>{item.number} / 06</span></p>
      <h1><span>WEAR</span><span>YOUR</span><span>STORY</span></h1>
      <div className="fh-description">
        <p className="fh-collection-title">{item.headline}</p>
        <p>{item.description}</p>
      </div>
      <div className="fh-actions">
        <Link className="fh-shop" href={item.href}>SHOP NOW <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <button className="fh-film" type="button"><Play size={13} fill="currentColor" aria-hidden="true" /> WATCH FILM</button>
      </div>
    </div>

    <div className="fh-stage" aria-live="polite">
      {previous !== null && <div className="fh-garment fh-garment-out" aria-hidden="true">
        <Image src={heroCollections[previous].image} alt="" fill sizes="(max-width: 900px) 88vw, 52vw" style={{ objectPosition: heroCollections[previous].position }} />
      </div>}
      <div className="fh-garment fh-garment-in" key={item.name}>
        <Image src={item.image} alt={`${item.name.toLowerCase()} from the RZO Fashion new collection`} fill priority={active === 0} sizes="(max-width: 900px) 88vw, 52vw" style={{ objectPosition: item.position }} />
      </div>
      <span className="fh-stage-name" aria-hidden="true">{item.name}</span>
    </div>

    <nav className="fh-categories" aria-label="Choose a featured collection">
      {heroCollections.map((collection, index) => <button
        type="button"
        key={collection.name}
        className={index === active ? 'is-active' : ''}
        onClick={() => select(index)}
        aria-current={index === active ? 'true' : undefined}
      ><span>{collection.number}</span><strong>{collection.name}</strong><i aria-hidden="true" /></button>)}
    </nav>

    <div className="fh-bottom">
      <div className="fh-progress" aria-label={`Slide ${active + 1} of ${heroCollections.length}`}>
        <span>{item.number}</span><div><i style={{ width: `${((active + 1) / heroCollections.length) * 100}%` }} /></div><span>06</span>
      </div>
      <div className="fh-controls">
        <button type="button" onClick={() => step(-1)} aria-label="Previous collection"><ArrowLeft size={17}/></button>
        <button type="button" onClick={() => step(1)} aria-label="Next collection"><ArrowRight size={17}/></button>
      </div>
    </div>
  </section>;
}
