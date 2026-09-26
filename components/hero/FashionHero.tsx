'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import HeroCategories from './HeroCategories';
import HeroContent from './HeroContent';
import HeroControls from './HeroControls';
import HeroMedia from './HeroMedia';
import { heroCollections } from './heroData';

const AUTO_ADVANCE_IMAGE_MS = 7000;
const AUTO_ADVANCE_VIDEO_FALLBACK_MS = 15000;

export default function FashionHero() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const reducedRef = useRef(false);

  const change = useCallback((next: number) => {
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

  const advance = useCallback(() => step(1), [step]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { reducedRef.current = query.matches; setReduced(query.matches); };
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setPrevious(null), reduced ? 80 : 1150);
    return () => window.clearTimeout(timeout);
  }, [active, reduced]);

  // Videos advance themselves as they finish (HeroMedia onFinish). This timer paces image
  // slides and is a safety net for a video that stalls or is blocked from autoplaying.
  useEffect(() => {
    if (reduced) return;
    const delay = heroCollections[active].video ? AUTO_ADVANCE_VIDEO_FALLBACK_MS : AUTO_ADVANCE_IMAGE_MS;
    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => { if (document.hidden) arm(); else advance(); }, delay);
    };
    arm();
    return () => window.clearTimeout(timer);
  }, [active, reduced, advance]);

  useEffect(() => {
    let frame = 0;
    const render = () => {
      if (root.current && !reducedRef.current) {
        pointer.current.x += (pointer.current.tx - pointer.current.x) * .05;
        pointer.current.y += (pointer.current.ty - pointer.current.y) * .05;
        root.current.style.setProperty('--ch-media-x', `${pointer.current.x * 8}px`);
        root.current.style.setProperty('--ch-media-y', `${pointer.current.y * 5}px`);
        root.current.style.setProperty('--ch-type-x', `${pointer.current.x * -4}px`);
        root.current.style.setProperty('--ch-type-y', `${pointer.current.y * -2}px`);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch' || reducedRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.tx = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    pointer.current.ty = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
  }

  return <section
    ref={root}
    className="ch"
    tabIndex={0}
    aria-roledescription="carousel"
    aria-label="RZO Fashion new collection"
    onKeyDown={event => { if (event.currentTarget !== event.target) return; if (event.key === 'ArrowLeft') step(-1); if (event.key === 'ArrowRight') step(1); }}
    onPointerMove={onPointerMove}
    onPointerLeave={() => { pointer.current.tx = 0; pointer.current.ty = 0; }}
  >
    <div className="ch-atmosphere" aria-hidden="true" /><div className="ch-grain" aria-hidden="true" />
    <div className="ch-ghost-type" aria-hidden="true"><span>RZO</span><span>FASHION</span></div>
    <HeroContent item={heroCollections[active]} />
    <div className="ch-media" aria-live="polite">{(previous !== null && previous !== active ? [previous, active] : [active]).map(index => <HeroMedia key={heroCollections[index].id} item={heroCollections[index]} state={index === active ? 'active' : 'leaving'} onFinish={reduced ? undefined : advance} />)}</div>
    <div className="ch-interactive"><HeroCategories active={active} onSelect={change} /><HeroControls active={active} /></div>
  </section>;
}
