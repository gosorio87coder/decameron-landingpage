import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { QuoteDetails } from '../types';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  details?: QuoteDetails | null;
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({ isOpen, onClose, details }) => {
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'call'>('whatsapp');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    destination: 'Otro',
    otherDestination: '',
    travelDate: '',
    passengers: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (details) {
        const addonsText = details.addons && details.addons.length > 0
          ? `Adicionales: ${details.addons.map(a => a.name).join(', ')}\n`
          : 'Adicionales: Ninguno\n';

        const message = `Solicitud de Pre-Reserva para ${details.packageName}:\n` +
          `---------------------------------\n` +
          `Fecha de Salida: ${details.departureDate ? details.departureDate.toLocaleDateString('es-ES') : 'No seleccionada'}\n` +
          `Adultos: ${details.adults || 0}\n` +
          `Niños: ${details.children || 0}\n` +
          `Infantes: ${details.infants || 0}\n` +
          addonsText +
          `Precio Total Estimado: $${details.totalPrice?.toLocaleString('en-US') || 0}\n`;

        setFormData({
          fullName: '',
          phone: '',
          destination: details.packageName,
          otherDestination: '',
          travelDate: details.departureDate ? details.departureDate.toISOString().split('T')[0] : '',
          passengers: String((details.adults || 0) + (details.children || 0)),
          message: message,
        });
      } else {
        // Reset for generic quote
        setFormData({
          fullName: '',
          phone: '',
          destination: 'Otro',
          otherDestination: '',
          travelDate: '',
          passengers: '',
          message: '',
        });
      }
    }
  }, [isOpen, details]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Un asesor se pondrá en contacto contigo a la brevedad.');
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-[#0D2B5B] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Cotiza tu Viaje Soñado
        </h2>
        <p className="text-gray-600 mb-6">Completa tus datos y un asesor se pondrá en contacto contigo a la brevedad.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" id="fullName" placeholder="Ej: Juan Pérez" required value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">WhatsApp o Teléfono</label>
            <input type="tel" id="phone" placeholder="+51 987 654 321" required value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferencia de Contacto</label>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setContactPreference('whatsapp')}
                className={`relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium transition-colors ${
                  contactPreference === 'whatsapp'
                    ? 'bg-[#1856C5] text-white z-10'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } focus:z-10 focus:outline-none focus:ring-1 focus:ring-[#1856C5] focus:border-[#1856C5]`}
              >
                Que me escriban por WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setContactPreference('call')}
                className={`-ml-px relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium transition-colors ${
                  contactPreference === 'call'
                    ? 'bg-[#1856C5] text-white z-10'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } focus:z-10 focus:outline-none focus:ring-1 focus:ring-[#1856C5] focus:border-[#1856C5]`}
              >
                Que me llamen
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino de Interés</label>
            <select 
              id="destination" 
              required 
              value={formData.destination}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"
            >
              <option value="Decameron Punta Sal">Decameron Punta Sal</option>
              <option value="Iquitos Lodge">Iquitos Lodge</option>
              <option value="Cusco Mágico">Cusco Mágico</option>
              <option value="Varadero & Habana">Varadero & Habana</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Europa Inolvidable">Europa Inolvidable</option>
              <option value="Otro">Otro destino</option>
            </select>
          </div>
          
          {formData.destination === 'Otro' && (
            <div>
              <label htmlFor="otherDestination" className="block text-sm font-medium text-gray-700">Especificar Destino</label>
              <input 
                type="text" 
                id="otherDestination" 
                placeholder="Ej: Riviera Maya, Tailandia..." 
                value={formData.otherDestination} 
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" 
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700">Fecha Aproximada</label>
              <input type="date" id="travelDate" value={formData.travelDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">N° de Pasajeros</label>
              <input type="number" id="passengers" min="1" placeholder="2" value={formData.passengers} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje Adicional</label>
            <textarea id="message" rows={details ? 8 : 3} placeholder="Cuéntanos más sobre tu viaje ideal..." value={formData.message} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-[#1856C5] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1856C5] transition-colors mt-6">
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteFormModal;
