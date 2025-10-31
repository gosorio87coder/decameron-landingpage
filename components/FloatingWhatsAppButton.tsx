import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './icons/SocialIcons';
import { WHATSAPP_LINK } from '../constants';

const FloatingWhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-500 ease-in-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
};

export default FloatingWhatsAppButton;
