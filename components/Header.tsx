'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useStore } from './Store';

export default function Header() {
  const { count, wishlist } = useStore();
  return <header className="header">
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
      <Link className="iconbtn desktop-icon" href="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}><Heart size={19}/>{wishlist.length>0&&<span className="count">{wishlist.length}</span>}</Link>
      <Link className="iconbtn" href="/cart" aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={19}/>{count>0&&<span className="count">{count}</span>}</Link>
      <button className="iconbtn mobile-only" aria-label="Open menu"><Menu size={21}/></button>
    </div>
  </header>;
}
