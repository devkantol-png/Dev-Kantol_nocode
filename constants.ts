import { Product } from './types';

export const PRODUCTS: Product[] = [
  // BAGS
  {
    id: 'b1',
    brand: 'GUCCI',
    title: 'GG Marmont Matelassé Shoulder Bag',
    category: 'Bags',
    condition: 'Like New',
    price: 168000,
    originalPrice: 195000,
    description: 'The GG Marmont chain shoulder bag has a softly structured shape and an oversized flap closure with Double G hardware. The sliding chain strap can be worn multiple ways, changing between a shoulder and a top handle bag.',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'],
    sizes: ['Small', 'Medium', 'Large']
  },
  {
    id: 'b2',
    brand: 'DIOR',
    title: 'Saddle Bag Oblique Blue',
    category: 'Bags',
    condition: 'Gently Used',
    price: 245000,
    description: 'Maria Grazia Chiuri brings a fresh update to the iconic Saddle bag. Crafted in blue Dior Oblique jacquard, the legendary design features a Saddle flap with a magnetic D stirrup clasp.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800'],
    sizes: ['Mini', 'Medium']
  },
  {
    id: 'b3',
    brand: 'CHANEL',
    title: 'Classic Flap Caviar Medium',
    category: 'Bags',
    condition: 'Vintage',
    price: 450000,
    originalPrice: 850000,
    description: 'The Classic Flap is the quintessential Chanel bag. This vintage piece features durable Caviar leather and the iconic CC turn-lock.',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
    sizes: ['Medium']
  },
  // WATCHES
  {
    id: 'w1',
    brand: 'OMEGA',
    title: 'Seamaster Diver 300M',
    category: 'Watches',
    condition: 'Like New',
    price: 380000,
    description: 'Since 1993, the Seamaster Professional Diver 300M has enjoyed a legendary following. This 42 mm model is crafted from stainless steel and includes a black ceramic bezel with a white enamel diving scale.',
    images: ['https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: 'w2',
    brand: 'ROLEX',
    title: 'Submariner Date',
    category: 'Watches',
    condition: 'Like New',
    price: 1150000,
    originalPrice: 1400000,
    description: 'The Rolex Submariner Date is the archetype of the divers watch. The Oyster architecture constitutes a rugged and comfortable watch.',
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: 'w3',
    brand: 'CARTIER',
    title: 'Santos Large Blue Dial',
    category: 'Watches',
    condition: 'Gently Used',
    price: 620000,
    description: 'Santos de Cartier watch, large model, mechanical movement with automatic winding, caliber 1847 MC. Steel case, heptagonal crown set with a faceted synthetic spinel.',
    images: ['https://images.unsplash.com/photo-1639037987888-25f68b321a48?auto=format&fit=crop&q=80&w=800'],
  },
  // SNEAKERS
  {
    id: 's1',
    brand: 'ADIDAS',
    title: 'Yeezy Boost 350 "Zebra"',
    category: 'Sneakers',
    condition: 'Like New',
    price: 32000,
    description: 'The Yeezy Boost 350 V2 Zebra features a white and black Primeknit upper with red SPLY-350 branding and a translucent white boost sole.',
    images: ['https://images.unsplash.com/photo-1584735174965-48c48d7edfde?auto=format&fit=crop&q=80&w=800'],
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: 's2',
    brand: 'NIKE',
    title: 'Dunk Low "Panda"',
    category: 'Sneakers',
    condition: 'Like New',
    price: 18500,
    description: 'From the school fit to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors.',
    images: ['https://images.unsplash.com/photo-1633966887768-64f9a421a7b5?auto=format&fit=crop&q=80&w=800'],
    sizes: ['6', '7', '8', '9', '10']
  },
  {
    id: 's3',
    brand: 'JORDAN',
    title: 'Air Jordan 1 Retro "Obsidian"',
    category: 'Sneakers',
    condition: 'Gently Used',
    price: 45000,
    originalPrice: 55000,
    description: 'The Air Jordan 1 Retro High OG Obsidian features a leather upper with Obsidian and University Blue overlays.',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'],
    sizes: ['8', '9', '10', '12']
  }
];

export const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
