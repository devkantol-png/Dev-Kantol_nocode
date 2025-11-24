import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, RefreshCw, Award, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';

const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
            Buy Authenticated <br/> Luxury Fashion
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 mb-10 tracking-wide max-w-2xl mx-auto">
            Premium pre-owned luxury, fully verified. Shop the world's best bags, watches, and sneakers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/marketplace')} variant="primary" className="min-w-[200px]">
              Browse Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tiles - Enhanced Visuals */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] md:h-[600px]">
          
          <div 
            onClick={() => navigate('/marketplace?category=Bags')}
            className="group relative h-full w-full overflow-hidden cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800" alt="Bags" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-8">
              <h3 className="text-3xl font-serif text-white mb-2">Bags</h3>
              <span className="text-lux-gold text-sm uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Shop Now &rarr;</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/marketplace?category=Watches')}
            className="group relative h-full w-full overflow-hidden cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800" alt="Watches" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-8">
              <h3 className="text-3xl font-serif text-white mb-2">Watches</h3>
              <span className="text-lux-gold text-sm uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Shop Now &rarr;</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/marketplace?category=Sneakers')}
            className="group relative h-full w-full overflow-hidden cursor-pointer"
          >
            <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" alt="Sneakers" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-8">
              <h3 className="text-3xl font-serif text-white mb-2">Sneakers</h3>
              <span className="text-lux-gold text-sm uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Shop Now &rarr;</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">New Arrivals</h2>
              <p className="text-gray-500">Hand-picked additions to our curated collection.</p>
            </div>
            <Button onClick={() => navigate('/marketplace')} variant="outline" className="hidden md:inline-flex">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button onClick={() => navigate('/marketplace')} variant="outline" fullWidth>View All</Button>
          </div>
        </div>
      </section>

      {/* How it Works / Trust */}
      <section className="py-24 bg-lux-offWhite">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">How Authentication Works</h2>
              <p className="text-gray-600">Every item sold on LuxReborn goes through our rigorous proprietary multi-step verification process.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-lux-gold mb-4">
                    <ShieldCheck size={32} />
                 </div>
                 <h3 className="font-serif text-xl">1. Verification</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">Our experts verify every detail, from stitching to serial numbers, ensuring 100% authenticity.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-lux-gold mb-4">
                    <RefreshCw size={32} />
                 </div>
                 <h3 className="font-serif text-xl">2. Quality Check</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">We assess the condition of the item to match our strict condition grading standards.</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-lux-gold mb-4">
                    <Award size={32} />
                 </div>
                 <h3 className="font-serif text-xl">3. Certification</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">Once approved, the item receives a LuxReborn tag and certificate of authenticity.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;