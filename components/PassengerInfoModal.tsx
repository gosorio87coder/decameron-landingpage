import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { WhatsAppIcon } from './icons/SocialIcons';
import { QuoteDetails } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface PassengerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: QuoteDetails | null;
}

const PassengerInfoModal: React.FC<PassengerInfoModalProps> = ({ isOpen, onClose, details }) => {
  const [passengerNames, setPassengerNames] = useState<string[]>([]);
  const [titularDNI, setTitularDNI] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (isOpen && details) {
      const totalPassengers = (details.adults || 0) + (details.children || 0);
      setPassengerNames(Array(totalPassengers > 0 ? totalPassengers : 0).fill(''));
      setTitularDNI('');
      setComments('');
    }
  }, [isOpen, details]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...passengerNames];
    newNames[index] = value;
    setPassengerNames(newNames);
  };

  const handleWhatsAppRedirect = () => {
    if (!details || !details.departureDate) return;

    const { departureDate, totalPrice, adults = 0, children = 0 } = details;

    const returnDate = new Date(departureDate);
    returnDate.setDate(returnDate.getDate() + 3);

    const totalPayingPassengers = adults + children;
    const pricePerPerson = totalPayingPassengers > 0 ? (totalPrice || 0) / totalPayingPassengers : 0;

    const adultNames = passengerNames.slice(0, adults);
    const childNames = passengerNames.slice(adults, adults + children);

    const titularName = adultNames[0] || '';
    const otherAdults = adultNames.slice(1);
    
    let passengerDetails = `Titular: ${titularName} DNI: ${titularDNI}`;

    if (otherAdults.length > 0) {
      passengerDetails += '\nResto de pasajeros:\n' + otherAdults.map(name => `- ${name || 'Nombre no ingresado'}`).join('\n');
    }

    if (childNames.length > 0) {
      passengerDetails += '\nResto de niños:\n' + childNames.map(name => `- ${name || 'Nombre no ingresado'}`).join('\n');
    }
    
    const commentsText = comments.trim() !== ''
        ? `\n\nLos comentarios adicionales son: ${comments}`
        : '';

    const message = `Solicitud de Pre-Reserva - Decameron Punta Sal por 03 Noches
El precio por persona es de: US$ ${pricePerPerson.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
La fecha de salida es: ${departureDate.toLocaleDateString('es-ES')} y la fecha de retorno: ${returnDate.toLocaleDateString('es-ES')}
La tarifa Total cotizada es US$ ${totalPrice?.toLocaleString('en-US')}

Y los pasajeros son:
${passengerDetails}${commentsText}`;
    
    const phoneNumber = WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen || !details) return null;

  const totalPassengers = (details.adults || 0) + (details.children || 0);
  const isFormComplete = passengerNames.every(name => name.trim() !== '') && titularDNI.trim() !== '';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Cerrar modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-[#0D2B5B] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Información de los Pasajeros
        </h2>
        <p className="text-gray-600 mb-6">Completa los datos para continuar con tu solicitud de reserva.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo de los Pasajeros</label>
            <div className="space-y-2">
                {Array.from({ length: totalPassengers }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Pasajero ${index + 1}`}
                        value={passengerNames[index] || ''}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"
                        required
                    />
                ))}
            </div>
          </div>

          <div>
            <label htmlFor="titular-dni" className="block text-sm font-medium text-gray-700">DNI del Pasajero Titular</label>
            <input
              type="text"
              id="titular-dni"
              placeholder="Ej: 12345678"
              value={titularDNI}
              onChange={(e) => setTitularDNI(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"
              required
            />
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comentarios Adicionales</label>
            <textarea
              id="comments"
              rows={3}
              placeholder="¿Alguna solicitud especial? Escríbela aquí."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"
            ></textarea>
          </div>
        </div>
        
        <button 
          onClick={handleWhatsAppRedirect}
          disabled={!isFormComplete}
          className="w-full flex items-center justify-center gap-3 mt-8 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <WhatsAppIcon className="h-6 w-6" />
          Solicita tu reserva a un agente Voyana
        </button>
      </div>
    </div>
  );
};

export default PassengerInfoModal;