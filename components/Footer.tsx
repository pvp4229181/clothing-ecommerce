import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return <footer className="footer"><div className="container">
    <Link className="brand-logo footer-logo" href="/" aria-label="RZO Fashion home">
      <Image src="/images/rzo-fashion-logo.png" alt="RZO Fashion" width={1893} height={831} sizes="220px" />
    </Link>
    <div className="footer-grid">
      <div><p className="eyebrow">The RZO circle</p><h3 className="display">First access. Private edits.</h3><p>New drops, thoughtful stories and invitations from Assam.</p><form className="newsletter"><input type="email" aria-label="Email address" placeholder="Email address"/><button aria-label="Subscribe"><ArrowRight size={18}/></button></form></div>
      {[['SHOP','New Arrivals','Shirts','T-Shirts','Bottomwear'],['HELP','Contact','Shipping','Returns','Track Order'],['ABOUT','Our Story','Journal','Careers','Privacy']].map(([h,...ls])=><div key={h}><h4>{h}</h4>{ls.map(x=><Link key={x} href="/">{x}</Link>)}</div>)}
    </div>
    <div className="legal"><span>© RZO Fashion 2026</span><span>Kachuwa Tiniali, near Punjab National Bank · Pomila Jarani, Nagaon, Assam 782426</span></div>
  </div></footer>;
}
