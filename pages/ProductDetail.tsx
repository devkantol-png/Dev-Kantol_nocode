import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS, formatINR } from '../constants';
import { useCart } from '../services/CartContext';
import Button from '../components/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/marketplace')}>Return to Marketplace</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize || undefined);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">{product.brand}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{product.title}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-2xl font-medium">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1 self-start mb-8 border border-gray-100">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               <span className="text-sm font-medium">{product.condition} Condition</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3 uppercase tracking-wide">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-12 px-4 border flex items-center justify-center transition-all ${
                        selectedSize === size 
                          ? 'border-lux-black bg-lux-black text-white' 
                          : 'border-gray-200 hover:border-lux-black text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 border-t border-gray-100">
              <Button onClick={handleAddToCart} fullWidth className="h-14 text-lg mb-6">
                Add to Cart — {formatINR(product.price)}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-lux-gold" />
                  <span>Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-lux-gold" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={18} className="text-lux-gold" />
                  <span>14-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;