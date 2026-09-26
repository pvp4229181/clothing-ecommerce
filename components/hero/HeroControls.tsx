import { heroCollections } from './heroData';

const total = heroCollections.length;
const totalLabel = String(total).padStart(2, '0');

export default function HeroControls({ active }: { active: number }) {
  return <div className="ch-bottom">
    <div className="ch-progress" aria-label={`Collection ${active + 1} of ${total}`}><span>{String(active + 1).padStart(2, '0')}</span><div><i style={{ width: `${((active + 1) / total) * 100}%` }} /></div><span>{totalLabel}</span></div>
  </div>;
}
