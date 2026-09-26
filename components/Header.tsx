'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useStore } from './Store';

// Past this point the header tucks away on scroll-down and returns on scroll-up
const HIDE_AFTER_PX = 320;

export default function Header() {
  const { count, wishlist } = useStore();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const headerRef = useRef<HTMLElement>(null);
  const [overHero, setOverHero] = useState(true);
  // Remember which page/bag state the header was hidden for, so a navigation or a bag change brings it back
  const revealKey = `${pathname}|${count}`;
  const [hiddenFor, setHiddenFor] = useState<string | null>(null);
  const hidden = hiddenFor === revealKey;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 10) return;
      setHiddenFor(y > lastY && y > HIDE_AFTER_PX ? revealKey : null);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealKey]);

  // On the homepage the header floats transparently over the hero, then turns solid once the hero scrolls away
  useEffect(() => {
    if (!isHome) return;
    const update = () => {
      const hero = document.querySelector('.ch');
      const header = headerRef.current;
      if (!hero || !header) return setOverHero(false);
      setOverHero(hero.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [isHome]);

  return <header
    ref={headerRef}
    className={`header${isHome ? ' header-home' : ''}${isHome && overHero ? ' header-clear' : ''}${hidden ? ' header-hidden' : ''}`}
    style={{ viewTransitionName: 'site-header' }}
    onFocus={() => setHiddenFor(null)}
  >
    <Link className="brand-logo header-logo" href="/" aria-label="RZO Fashion home">
      <Image src="/images/rzo-fashion-logo.png" alt="RZO Fashion" width={1893} height={831} priority sizes="112px" />
    </Link>
    <nav className="nav" aria-label="Primary navigation">
      {['New In','Shirts','T-Shirts','Bottomwear','Co-ords','Essentials','Sale'].map(x =>
        <Link key={x} href={`/collections/${x.toLowerCase().replaceAll(' ','-')}`}>{x}</Link>
      )}
    </nav>
    <div className="actions">
      <Link className="iconbtn" href="/search" aria-label="Search"><Search size={19}/></Link>
      <Link className="iconbtn desktop-icon" href="/account/login" aria-label="Account"><UserRound size={19}/></Link>
      <Link className="iconbtn desktop-icon" href="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}><Heart size={19}/>{wishlist.length>0&&<span className="count" key={wishlist.length}>{wishlist.length}</span>}</Link>
      <Link className="iconbtn" href="/cart" aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={19}/>{count>0&&<span className="count" key={count}>{count}</span>}</Link>
      <button className="iconbtn mobile-only" aria-label="Open menu"><Menu size={21}/></button>
    </div>
  </header>;
}
