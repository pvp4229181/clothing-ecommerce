export type HeroCollection = {
  id: string;
  number: string;
  label: string;
  /** Three stacked display lines — keep each to ~6 characters so it fits the hero column */
  headline: [string, string, string];
  kicker: string;
  description: string;
  cta: string;
  video: string | null;
  fallbackImage: string;
  href: string;
  objectPosition: string;
};

export const heroCollections: HeroCollection[] = [
  { id: 'shirts', number: '01', label: 'SHIRTS', headline: ['WEAR', 'YOUR', 'STORY'], kicker: 'REFINED EVERYDAY', description: 'Considered collars. Natural texture. A sharper way to move through the everyday.', cta: 'SHOP SHIRTS', video: '/videos/hero/shirt.mp4', fallbackImage: '/videos/hero/posters/shirt.jpg', href: '/collections/shirts', objectPosition: '50% 50%' },
  { id: 'tshirts', number: '02', label: 'T-SHIRTS', headline: ['KEEP', 'IT', 'CLEAN'], kicker: 'ESSENTIAL FORM', description: 'Clean necklines, an easy drape and a shape that holds. The tee you reach for first.', cta: 'SHOP TEES', video: '/videos/hero/tshirt.mp4', fallbackImage: '/videos/hero/posters/tshirt.jpg', href: '/collections/t-shirts', objectPosition: '50% 50%' },
  { id: 'trousers', number: '03', label: 'TROUSERS', headline: ['MOVE', 'WITH', 'EASE'], kicker: 'TAILORED MOVEMENT', description: 'Relaxed through the leg, sharp at the waist. Tailoring that keeps pace with your day.', cta: 'SHOP TROUSERS', video: '/videos/hero/trousers.mp4', fallbackImage: '/videos/hero/posters/trousers.jpg', href: '/collections/bottomwear', objectPosition: '50% 50%' },
  { id: 'jeans', number: '04', label: 'JEANS', headline: ['MADE', 'TO', 'FADE'], kicker: 'LIVED-IN DENIM', description: 'Considered washes and honest construction. Denim that gets better every time you wear it.', cta: 'SHOP DENIM', video: '/videos/hero/jeans.mp4', fallbackImage: '/videos/hero/posters/jeans.jpg', href: '/collections/jeans', objectPosition: '50% 50%' },
  { id: 'jackets', number: '05', label: 'JACKETS', headline: ['LAYER', 'WITH', 'INTENT'], kicker: 'THE FINISHING LAYER', description: 'Strong silhouettes and purposeful construction. The piece that completes every look.', cta: 'SHOP JACKETS', video: '/videos/hero/jacket.mp4', fallbackImage: '/videos/hero/posters/jacket.jpg', href: '/collections/jackets', objectPosition: '50% 50%' },
  { id: 'coords', number: '06', label: 'CO-ORD SETS', headline: ['ONE', 'LOOK', 'DONE'], kicker: 'MADE TOGETHER', description: 'Matched fabrics, balanced proportions. One complete outfit — or wear each piece apart.', cta: 'SHOP CO-ORDS', video: '/videos/hero/coord.mp4', fallbackImage: '/videos/hero/posters/coord.jpg', href: '/collections/co-ords', objectPosition: '50% 50%' },
];
