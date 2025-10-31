import React, { useState } from 'react';
import { EmailIcon, WhatsAppIcon } from './icons/SocialIcons';

const Newsletter: React.FC = () => {
  const [subscriptionType, setSubscriptionType] = useState<'email' | 'whatsapp'>('whatsapp');
  const [inputValue, setInputValue] = useState('');

  const handleTypeChange = (type: 'email' | 'whatsapp') => {
    setSubscriptionType(type);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputValue) return;
    alert(`¡Gracias por suscribirte! Recibirás nuestras ofertas por ${subscriptionType === 'email' ? 'correo' : 'WhatsApp'} a: ${inputValue}`);
    setInputValue('');
  };

  const inputType = subscriptionType === 'email' ? 'email' : 'tel';
  const placeholder = subscriptionType === 'email'
    ? 'Ingresa tu correo electrónico'
    : 'Ingresa tu número de WhatsApp';

  return (
    <section className="my-16 relative bg-cover bg-center rounded-2xl overflow-hidden text-white py-16 px-4" style={{backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758728952/tropical-beach-background_c7j5vj.webp')"}}>
      <div className="absolute inset-0 bg-[#0D2B5B]/80 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quiero ser el primero en enterarme</h2>
        <p className="text-lg text-blue-200 mb-8">Recibe promociones exclusivas y las últimas noticias de viajes directamente en tu bandeja de entrada o WhatsApp.</p>

        <div className="flex justify-center mb-6 bg-black/20 rounded-full p-1 max-w-xs mx-auto">
          <button
            onClick={() => handleTypeChange('whatsapp')}
            className={`w-1/2 font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${subscriptionType === 'whatsapp' ? 'bg-[#FBBF24] text-[#0D2B5B]' : 'hover:bg-white/10'}`}
            aria-pressed={subscriptionType === 'whatsapp'}
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => handleTypeChange('email')}
            className={`w-1/2 font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${subscriptionType === 'email' ? 'bg-[#FBBF24] text-[#0D2B5B]' : 'hover:bg-white/10'}`}
            aria-pressed={subscriptionType === 'email'}
          >
            <EmailIcon className="h-5 w-5" />
            <span>Email</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <label htmlFor="subscription-input" className="sr-only">{placeholder}</label>
          <input
            id="subscription-input"
            type={inputType}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-grow w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-shadow"
          />
          <button
            type="submit"
            className="bg-[#1856C5] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black/50"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
