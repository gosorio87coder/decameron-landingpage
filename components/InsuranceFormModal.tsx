import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface InsuranceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InsuranceFormModal: React.FC<InsuranceFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias! Un asesor te enviará la cotización de tu seguro de viaje a la brevedad.');
    onClose();
  };

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
          Cotiza tu Seguro de Viaje
        </h2>
        <p className="text-gray-600 mb-6">Viaja con tranquilidad. Completa tus datos para recibir una cotización personalizada.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="insurance-fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input type="text" id="insurance-fullName" placeholder="Ej: Ana Rodríguez" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>
          <div>
            <label htmlFor="insurance-phone" className="block text-sm font-medium text-gray-700">WhatsApp o Teléfono</label>
            <input type="tel" id="insurance-phone" placeholder="+51 987 654 321" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>
           <div>
            <label htmlFor="insurance-destination" className="block text-sm font-medium text-gray-700">Destino(s)</label>
            <input type="text" id="insurance-destination" placeholder="Ej: Europa, Estados Unidos" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="insurance-startDate" className="block text-sm font-medium text-gray-700">Fecha de Salida</label>
              <input type="date" id="insurance-startDate" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <label htmlFor="insurance-endDate" className="block text-sm font-medium text-gray-700">Fecha de Retorno</label>
              <input type="date" id="insurance-endDate" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
          </div>
           <div>
            <label htmlFor="insurance-passengers" className="block text-sm font-medium text-gray-700">N° de Pasajeros</label>
            <input type="number" id="insurance-passengers" min="1" placeholder="2" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-6">
              Solicitar Cotización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceFormModal;
