import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../services/CartContext';
import { useAuth } from '../services/AuthContext';
import { supabase } from '../services/supabaseClient';
import Button from '../components/Button';
import { formatINR } from '../constants';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    phone: '',
    state: ''
  });

  // Pre-fill data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen pt-24 text-center">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/marketplace')}>Continue Shopping</Button>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Get current user ID (we know they are auth'd here)
      const { data: { user: authUser } } = await supabase.auth.getUser();

      const orderPayload = {
        user_id: authUser ? authUser.id : null,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        address_line1: formData.address,
        address_line2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.postalCode,
        total_amount: cartTotal,
        items: cart, // Storing the full cart as JSON
      };

      const { error } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select()
        .single();

      if (error) throw error;

      clearCart();
      setStep('success');

    } catch (err: any) {
      console.error('Order Error:', err);
      setErrorMsg('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required 
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required 
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Address Line 1</label>
          <input 
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required 
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Address Line 2 (Optional)</label>
          <input 
            type="text" 
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City</label>
          <input 
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required 
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
        <div>
           <label className="block text-xs font-bold uppercase text-gray-500 mb-1">State</label>
           <input 
             type="text" 
             name="state"
             value={formData.state}
             onChange={handleInputChange}
             required 
             className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
           />
        </div>
        <div>
           <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Postal Code</label>
           <input 
             type="text" 
             name="postalCode"
             value={formData.postalCode}
             onChange={handleInputChange}
             required 
             className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
           />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required 
            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" 
          />
        </div>
      </div>
      <Button type="submit" fullWidth>Continue to Payment</Button>
    </form>
  );

  const PaymentForm = () => (
    <form onSubmit={handlePayment} className="space-y-6 animate-fade-in">
       <div className="p-4 border border-lux-gold/30 bg-lux-gold/5 rounded mb-4">
          <p className="text-sm text-lux-goldDark font-medium">Secure SSL Encrypted Transaction</p>
       </div>
       
       {errorMsg && (
         <div className="p-3 bg-red-50 text-red-600 text-sm border border-red-100 rounded">
           {errorMsg}
         </div>
       )}

       <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" required className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Expiry</label>
               <input type="text" placeholder="MM/YY" required className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" />
            </div>
            <div>
               <label className="block text-xs font-bold uppercase text-gray-500 mb-1">CVC</label>
               <input type="text" placeholder="123" required className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-lux-black outline-none" />
            </div>
          </div>
       </div>
       <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setStep('shipping')} className="flex-1">Back</Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Processing...' : `Pay ${formatINR(cartTotal)}`}
          </Button>
       </div>
    </form>
  );

  const SuccessView = () => (
    <div className="text-center animate-fade-in py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h2 className="text-4xl font-serif mb-4">Order Confirmed</h2>
      <p className="text-gray-500 mb-8">Thank you, {formData.fullName}. Your order has been securely recorded.</p>
      <Button onClick={() => navigate('/')}>Return Home</Button>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {step === 'success' ? (
          <SuccessView />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div>
              <div className="mb-8 flex items-center gap-4 text-sm font-medium text-gray-400">
                 <span className={step === 'shipping' ? 'text-lux-black' : 'text-green-600'}>Shipping</span>
                 <span>/</span>
                 <span className={step === 'payment' ? 'text-lux-black' : ''}>Payment</span>
                 <span>/</span>
                 <span>Confirmation</span>
              </div>
              <h1 className="font-serif text-3xl mb-8">{step === 'shipping' ? 'Shipping Details' : 'Payment Method'}</h1>
              <div className="bg-white p-8 shadow-sm">
                 {step === 'shipping' ? <ShippingForm /> : <PaymentForm />}
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:pl-12">
               <div className="bg-white p-8 shadow-sm sticky top-32">
                  <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                     {cart.map(item => (
                        <div key={item.cartId} className="flex gap-4">
                           <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover bg-gray-100" />
                           <div className="flex-1">
                              <h4 className="text-sm font-medium leading-tight">{item.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">{item.brand} {item.selectedSize && `- Size ${item.selectedSize}`}</p>
                           </div>
                           <span className="text-sm font-medium">{formatINR(item.price)}</span>
                        </div>
                     ))}
                  </div>
                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                     <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{formatINR(cartTotal)}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>Free</span>
                     </div>
                     <div className="flex justify-between pt-4 text-lg font-medium font-serif border-t border-gray-100 mt-4">
                        <span>Total</span>
                        <span>{formatINR(cartTotal)}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;