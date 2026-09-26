export type HeroCollection = {
  number: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  href: string;
  position: string;
};

export const heroCollections: HeroCollection[] = [
  { number: '01', name: 'SHIRTS', headline: 'REFINED EVERYDAY', description: 'Considered collars. Natural texture. A sharper way to move through the everyday.', image: '/images/campaign/focus-shirts.png', href: '/collections/shirts', position: '50% 42%' },
  { number: '02', name: 'T-SHIRTS', headline: 'ESSENTIAL FORM', description: 'Premium weight and relaxed proportions, made for the rhythm of daily life.', image: '/images/campaign/focus-tshirts.png', href: '/collections/t-shirts', position: '50% 40%' },
  { number: '03', name: 'TROUSERS', headline: 'EASE, TAILORED', description: 'Clean pleats and easy structure—tailoring without the ceremony.', image: '/images/campaign/focus-trousers.png', href: '/collections/bottomwear', position: '50% 50%' },
  { number: '04', name: 'JEANS', headline: 'DENIM, RECAST', description: 'Straight lines, honest texture and a fit that gets better with time.', image: '/images/campaign/focus-jeans.png', href: '/collections/jeans', position: '50% 50%' },
  { number: '05', name: 'JACKETS', headline: 'THE OUTER LAYER', description: 'Purposeful layers with quiet structure, designed to complete the silhouette.', image: '/images/campaign/focus-jackets.png', href: '/collections/jackets', position: '50% 40%' },
  { number: '06', name: 'CO-ORD SETS', headline: 'ONE CLEAR IDEA', description: 'Tonal dressing made effortless. Two pieces, one considered point of view.', image: '/images/campaign/focus-coords.png', href: '/collections/co-ords', position: '50% 50%' },
];
