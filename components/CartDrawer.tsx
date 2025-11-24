import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../services/CartContext';
import { formatINR } from '../constants';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="font-serif text-xl font-medium">Shopping Bag ({cart.length})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-400">Your bag is empty.</p>
              <Button onClick={() => { toggleCart(); navigate('/marketplace'); }} variant="outline">Browse Collection</Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4">
                <div className="w-20 h-24 bg-gray-100 shrink-0">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm leading-tight">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 uppercase">{item.brand}</p>
                    {item.selectedSize && <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize}</p>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium">{formatINR(item.price)}</span>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between text-lg font-medium font-serif">
              <span>Subtotal</span>
              <span>{formatINR(cartTotal)}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Shipping & taxes calculated at checkout.</p>
            <Button onClick={handleCheckout} fullWidth className="group">
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;