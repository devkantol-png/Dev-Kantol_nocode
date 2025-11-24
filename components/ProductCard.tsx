import React from 'react';
import { Product } from '../types';
import { formatINR } from '../constants';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group cursor-pointer flex flex-col gap-3"
      onClick={() => navigate(`/listing/${product.id}`)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-wider font-semibold">
            {product.condition}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
          {product.brand}
        </p>
        <h3 className="font-serif text-lg leading-snug group-hover:text-lux-goldDark transition-colors">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-medium">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through decoration-gray-400">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;