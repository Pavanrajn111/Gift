// CHARIS Centralized Image Registry & Fallback Mapping
// Maps product categories, slugs, occasions, and editorial sections to local optimized WebP assets.

export const IMAGES = {
  gifts: {
    birthday: '/images/gifts/birthday-gift.webp',
    anniversary: '/images/gifts/anniversary-gift.webp',
    perfume: '/images/gifts/perfume-set.webp',
    photoFrame: '/images/gifts/photo-frame.webp',
    jewellery: '/images/gifts/jewellery-box.webp',
    chocolate: '/images/gifts/chocolate-hamper.webp',
    leatherJournal: '/images/gifts/leather-journal.webp',
    candle: '/images/gifts/candle-set.webp',
    skincare: '/images/gifts/skincare-hamper.webp',
    homeDecor: '/images/gifts/home-decor.webp',
  },
  occasions: {
    birthday: '/images/occasions/birthday.webp',
    anniversary: '/images/occasions/anniversary.webp',
    thankYou: '/images/occasions/thank-you.webp',
    housewarming: '/images/occasions/housewarming.webp',
    farewell: '/images/occasions/farewell.webp',
  },
  editorial: {
    craftsmanship: '/images/editorial/craftsmanship.webp',
    giftWrapping: '/images/editorial/gift-wrapping.webp',
    handwrittenNote: '/images/editorial/handwritten-note.webp',
  },
} as const;

/**
 * Returns a reliable local image path for any product based on its category, name, or kind.
 */
export function getProductImage(item?: { imageUrl?: string; categoryId?: string; kind?: string; slug?: string; name?: string }): string {
  if (!item) return IMAGES.gifts.candle;

  // If item has a local image URL already
  if (item.imageUrl && item.imageUrl.startsWith('/images/')) {
    return item.imageUrl;
  }

  const kind = (item.kind || '').toLowerCase();
  const slug = (item.slug || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const cat = (item.categoryId || '').toLowerCase();

  if (kind.includes('candle') || name.includes('candle') || slug.includes('candle')) return IMAGES.gifts.candle;
  if (kind.includes('journal') || name.includes('journal') || slug.includes('journal')) return IMAGES.gifts.leatherJournal;
  if (kind.includes('scarf') || name.includes('perfume') || slug.includes('perfume')) return IMAGES.gifts.perfume;
  if (kind.includes('mug') || name.includes('decor') || slug.includes('decor') || cat.includes('home')) return IMAGES.gifts.homeDecor;
  if (kind.includes('plant') || name.includes('photo') || slug.includes('frame')) return IMAGES.gifts.photoFrame;
  if (kind.includes('pendant') || name.includes('jewel') || slug.includes('ring') || cat.includes('jewel')) return IMAGES.gifts.jewellery;
  if (name.includes('chocolate') || slug.includes('chocolate')) return IMAGES.gifts.chocolate;
  if (name.includes('skin') || slug.includes('skincare')) return IMAGES.gifts.skincare;
  if (name.includes('anniversary') || slug.includes('anniversary')) return IMAGES.gifts.anniversary;

  // Fallback to local birthday gift box
  return IMAGES.gifts.birthday;
}

/**
 * Returns the local image for an occasion slug.
 */
export function getOccasionImage(slug: string): string {
  const s = slug.toLowerCase().replace(/[^a-z]/g, '');
  if (s.includes('birth')) return IMAGES.occasions.birthday;
  if (s.includes('anni')) return IMAGES.occasions.anniversary;
  if (s.includes('thank')) return IMAGES.occasions.thankYou;
  if (s.includes('house') || s.includes('home')) return IMAGES.occasions.housewarming;
  if (s.includes('fare') || s.includes('goodbye')) return IMAGES.occasions.farewell;
  return IMAGES.occasions.birthday;
}
