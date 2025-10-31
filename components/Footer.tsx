
import React from 'react';
import { VoyanaLogo } from './icons/VoyanaLogo';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, EmailIcon } from './icons/SocialIcons';
import { WHATSAPP_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D2B5B] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Columna 1: Logo y Razón Social */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <VoyanaLogo className="h-10 w-auto text-white" />
            <div className="text-blue-200">
              <p className="font-semibold">VOYANA - GOP Negocios</p>
              <p>RUC: 20613751557</p>
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contacto</h3>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors">
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="mailto:contacto@voyanatravel.pe" className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors">
                  <EmailIcon className="h-5 w-5" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Síguenos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Síguenos</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.facebook.com/voyanatravel" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-blue-200 hover:text-white transition-colors">
                <FacebookIcon className="h-8 w-8" />
              </a>
              <a href="https://www.instagram.com/voyana.travel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-blue-200 hover:text-white transition-colors">
                <InstagramIcon className="h-8 w-8" />
              </a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Voyana Travel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;