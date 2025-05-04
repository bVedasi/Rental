import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-dark text-light flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair text-gold mb-4">Thank You!</h1>
        <p className="text-light-dark font-montserrat mb-8">
          Your order has been placed successfully. We’ll contact you soon.
        </p>
        <Link to="/categories">
          <button className="bg-gold text-dark px-6 py-2 rounded font-montserrat hover:bg-gold/90">
            Continue Shopping
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
