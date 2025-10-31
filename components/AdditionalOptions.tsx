import React from 'react';
import { SuitcaseIcon, ShieldCheckIcon, ShipIcon, CastleIcon } from './icons/FeatureIcons';
import { QuoteDetails } from '../types';

const options = [
    {
        id: 'personaliza',
        icon: <SuitcaseIcon />,
        title: 'Personaliza tu Viaje',
        description: 'Crea una experiencia a tu medida. Dinos a dónde quieres ir y nosotros lo hacemos realidad.'
    },
    {
        id: 'seguros',
        icon: <ShieldCheckIcon />,
        title: 'Seguros de Viaje',
        description: 'Viaja con tranquilidad. Ofrecemos la mejor cobertura y asistencia médica internacional.'
    },
    {
        id: 'cruceros',
        icon: <ShipIcon />,
        title: 'Cruceros',
        description: 'Embárcate en una aventura por los mares del mundo. Descubre destinos exóticos con todo el lujo.'
    },
    {
        id: 'disney',
        icon: <CastleIcon />,
        title: 'Disney',
        description: 'Vive la magia en los parques de Disney. Paquetes especiales para toda la familia.'
    }
];

interface AdditionalOptionsProps {
    onOpenQuote: (details?: QuoteDetails) => void;
    onOpenInsurance: () => void;
}


const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({ onOpenQuote, onOpenInsurance }) => {
    return (
        <section id="options" className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0D2B5B]">Opciones Adicionales</h2>
                     <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Complementa tu aventura con nuestros servicios exclusivos.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* FIX: Refactored to use conditional rendering for button/div to solve TypeScript error. */}
                    {options.map((option, index) => {
                        const cardContent = (
                            <div className="bg-gray-50 h-full rounded-2xl p-8 text-center border border-gray-200 hover:shadow-xl hover:border-[#1856C5] transition-all duration-300 group">
                                <div className="mx-auto bg-blue-100 text-[#1856C5] w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1856C5] group-hover:text-white transition-colors duration-300">
                                    {React.cloneElement(option.icon, { className: 'h-10 w-10' })}
                                </div>
                                <h3 className="text-xl font-bold text-[#0D2B5B] mb-2">{option.title}</h3>
                                <p className="text-gray-600">{option.description}</p>
                            </div>
                        );

                        if (option.id === 'personaliza') {
                            return (
                                <button key={index} onClick={() => onOpenQuote()} className="w-full text-left">
                                    {cardContent}
                                </button>
                            );
                        }

                        if (option.id === 'seguros') {
                            return (
                                <button key={index} onClick={onOpenInsurance} className="w-full text-left">
                                    {cardContent}
                                </button>
                            );
                        }
                        
                        return (
                            <div key={index}>
                                {cardContent}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default AdditionalOptions;
