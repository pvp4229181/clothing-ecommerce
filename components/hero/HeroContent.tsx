import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { heroCollections, type HeroCollection } from './heroData';

export default function HeroContent({ item }: { item: HeroCollection }) {
  return <div className="ch-content" key={item.id}>
    <p className="ch-eyebrow">NEW COLLECTION <span>{item.number} / {String(heroCollections.length).padStart(2, '0')}</span></p>
    <h1>{item.headline.map(line => <span key={line}>{line}</span>)}</h1>
    <div className="ch-copy"><strong>{item.kicker}</strong><p>{item.description}</p></div>
    <Link className="ch-shop" href={item.href}>{item.cta} <ArrowUpRight size={15} aria-hidden="true" /></Link>
  </div>;
}
